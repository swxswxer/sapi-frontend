import { getAkskUsingGet } from '@/services/sapi-backend/userController';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import type { DescriptionsProps } from 'antd';
import { Button, Descriptions, Input, message, Modal, Typography } from 'antd';
import React, { useState } from 'react';

const { Text } = Typography;

const App: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser || {};
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [ak, setAk] = useState('*******');
  const [sk, setSk] = useState('*******');
  const [loading, setLoading] = useState(false);
  const [keysVisible, setKeysVisible] = useState(false); // 新增状态

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '用户名',
      children: currentUser.userAccount,
    },
    {
      key: '3',
      label: '角色',
      children: currentUser.userRole,
    },
    {
      key: '4',
      label: '性别',
      children: currentUser.gender === 1 ? '女' : '男',
    },
    {
      label: 'AccessKey',
      span: 3,
      children: ak,
    },
    {
      label: 'SecretKey',
      span: 3,
      children: sk,
    },
  ];

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      const response = await getAkskUsingGet({ userPassword: password });
      if (response?.data) {
        setAk(response.data.accessKey); // 设置实际的 AK 值
        setSk(response.data.secretKey); // 设置实际的 SK 值
        setKeysVisible(true); // 成功获取后显示密钥
        message.success('密码正确，已显示 AK 和 SK');
        setVisible(false);
      } else {
        message.error('密码错误或获取 AK/SK 失败');
      }
    } catch (error) {
      message.error('请求失败，请稍后重试');
    }
    setLoading(false);
    setPassword(''); // 清空输入框
  };

  const handleCancel = () => {
    setVisible(false);
    setPassword(''); // 清空输入框
  };

  const toggleKeysVisibility = () => {
    if (keysVisible) {
      setAk('*******');
      setSk('*******');
      setKeysVisible(!keysVisible);
    } else {
      showModal();
    }
  };

  return (
    <PageContainer>
      <Descriptions layout="vertical" bordered items={items} />
      <div style={{ textAlign: 'left', marginTop: 16 }}>
        <Text type="danger">请用户妥善保管密钥，不要提供给他人使用！</Text>
        <br />
        <Button type="primary" onClick={toggleKeysVisibility} style={{ marginTop: 8 }}>
          {keysVisible ? '隐藏密钥' : '查询密钥'}
        </Button>
      </div>
      <Modal
        title="为保证用户信息安全，请输入账号密码"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="请输入密码"
        />
      </Modal>
    </PageContainer>
  );
};

export default App;
