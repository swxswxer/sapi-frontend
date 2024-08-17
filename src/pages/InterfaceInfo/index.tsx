import {
  getInterfaceInfoByIdUsingGet,
  invokeInterfaceInfoUsingPost,
} from '@/services/sapi-backend/interfaceInfoController';
import { getInterfaceLeftNumByInterfaceIdUsingGet } from '@/services/sapi-backend/userController';
import { useParams } from '@@/exports';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Checkbox,
  Descriptions,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Tag,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';

const { Text } = Typography;

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const [invokeRes, setInvokeRes] = useState<any>();
  const [invokeLoading, setInvokeLoading] = useState(false);
  const [remainingCalls, setRemainingCalls] = useState<number>(0);
  const [form] = Form.useForm();
  const params = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);

  const loadData = async () => {
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGet({
        id: Number(params.id),
      });
      setData(res.data);
      form.setFieldsValue({
        userRequestParams: res.data?.requestParams,
      });

      // 获取接口剩余调用次数
      const totalRes = await getInterfaceLeftNumByInterfaceIdUsingGet({
        interfaceInfoId: Number(params.id),
      });
      setRemainingCalls(totalRes.data);
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();

    const doNotShow = localStorage.getItem('doNotShowModal');
    if (!doNotShow) {
      setIsModalVisible(true);
    }
  }, []);

  const handleOk = () => {
    if (doNotShowAgain) {
      localStorage.setItem('doNotShowModal', 'true');
    }
    setIsModalVisible(false);
  };

  const onFinish = async (values: any) => {
    if (!params.id) {
      message.error('接口不存在');
      return;
    }
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfoUsingPost({
        id: params.id,
        ...values,
      });
      if (!res.data || res.code === 40000) {
        message.error('操作失败，' + res.message);
        setInvokeLoading(false);
        return;
      }
      if (res.code === 0) {
        setInvokeRes(res.data);
        message.success('请求成功');

        // 调用成功后刷新剩余调用次数
        const totalRes = await getInterfaceLeftNumByInterfaceIdUsingGet({
          interfaceInfoId: Number(params.id),
        });
        setRemainingCalls(totalRes.data);
      }
    } catch (error: any) {
      message.error('操作失败，' + error.message);
    }
    setInvokeLoading(false);
  };

  const getMethodTagColor = (method: string | undefined) => {
    switch (method?.toUpperCase()) {
      case 'GET':
        return 'green';
      case 'POST':
        return 'blue';
      case 'PUT':
        return 'orange';
      case 'DELETE':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <PageContainer title="查看接口文档">
      <Modal
        title="温馨提示"
        visible={isModalVisible}
        onOk={handleOk}
        cancelButtonProps={{ style: { display: 'none' } }}
        footer={[
          <Checkbox
            onChange={(e) => setDoNotShowAgain(e.target.checked)}
            style={{ marginRight: 'auto' }}
          >
            不再提示
          </Checkbox>,
          <Button key="submit" type="primary" onClick={handleOk}>
            我已知悉
          </Button>,
        ]}
      >
        <p>平台为每位新用户提供每个接口50次的调用额度</p>
        <p>如果额度用完,请期待平台后续更新（会以签到的形式给予用户额度）</p>
        <p style={{ color: 'red' }}>请注意！在线调试与SDK调用都会消耗接口额度！</p>
      </Modal>
      <Card>
        {data ? (
          <Descriptions title={data.name} column={1}>
            <Descriptions.Item label="接口状态">{data.status ? '开启' : '关闭'}</Descriptions.Item>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求方法">
              <Tag color={getMethodTagColor(data.method)}>{data.method}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="请求参数">
              {data?.requestParams ? data.requestParams : '无'}
            </Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
      </Card>
      <Divider />
      <Card title="在线测试">
        <Form form={form} name="invoke" layout="vertical" onFinish={onFinish}>
          <Form.Item label="请求参数" name="userRequestParams">
            <Input.TextArea disabled={!data?.requestParams} />
          </Form.Item>
          {/* 在输入框下面和按钮上面显示提示信息 */}
          <Text type="secondary">接口剩余调用次数：{remainingCalls}</Text>
          <Form.Item wrapperCol={{ span: 16 }}>
            <Button type="primary" htmlType="submit" loading={invokeLoading}>
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Divider />
      <Card title="返回结果" loading={invokeLoading}>
        {invokeRes}
      </Card>
    </PageContainer>
  );
};

export default Index;
