import { listInterfaceInfoByPageUsingGet } from '@/services/sapi-backend/interfaceInfoController';
import { ProList } from '@ant-design/pro-components';
import { message, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from '@umijs/max';
import {BarChartOutlined, LikeOutlined} from '@ant-design/icons';
import { getTotalNumByIdUsingGet } from "@/services/sapi-backend/analysisController";

interface IconTextProps {
  icon: React.FC;
  text: string | number;
}

const IconText: React.FC<IconTextProps> = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [totals, setTotals] = useState<{ [key: number]: number }>({});
  const [ghost] = useState<boolean>(false);
  const navigate = useNavigate();

  const loadData = async (current = 1, pageSize = 5) => {
    setLoading(true);
    try {
      const res = await listInterfaceInfoByPageUsingGet({
        current,
        pageSize,
      });
      const data = res?.data?.records ?? [];
      setList(data);
      const totalPromises = data.map(async (item) => {
        const totalRes = await getTotalNumByIdUsingGet({ interfaceInfoId: item.id });
        return { id: item.id, total: totalRes ?? 0 };
      });
      const totalsArray = await Promise.all(totalPromises);
      const totalsMap = totalsArray.reduce((acc, item) => {
        // @ts-ignore
        acc[item.id] = item.total;
        return acc;
      }, {} as { [key: number]: number });
      setTotals(totalsMap);
    } catch (error: any) {
      message.error('请求失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCardClick = (id: number | undefined) => {
    navigate(`/interface_info/${id}`);
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
    <div
      style={{
        backgroundColor: '#eee',
        margin: -24,
        padding: 24,
      }}
    >
      <ProList<API.InterfaceInfo>
        loading={loading}
        ghost={ghost}
        itemCardProps={{
          ghost,
        }}
        pagination={{
          defaultPageSize: 8,
          showSizeChanger: false,
        }}
        showActions="hover"
        rowSelection={{}}
        grid={{ gutter: 16, column: 4 }}
        onItem={(record: API.InterfaceInfo) => {
          return {
            onMouseEnter: () => {
              console.log(record);
            },
            onClick: () => {
              handleCardClick(record.id);
            },
          };
        }}
        metas={{
          title: {
            dataIndex: 'name',
            title: '接口名称',
          },
          subTitle: {
            render: (_, record) => (
              <Tag color={getMethodTagColor(record.method)}>
                {record.method}
              </Tag>
            ),
          },
          type: {
            dataIndex: 'method',
            title: '请求方式',
          },
          avatar: {
            render: () => (
              <img
                src="https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg"
                alt="avatar"
                style={{ width: 30, height: 30 }}
              />
            ),
          },
          content: {
            dataIndex: 'description',
            title: '描述',
            render: (text: string) => <div>{text}</div>,
          },
          actions: {
            render: (_, record) => [
              <IconText
                icon={BarChartOutlined}
                text={totals[record.id] || 0}
                key="list-vertical-like-o"
              />,
            ],
          },
        }}
        headerTitle="接口广场"
        dataSource={list}
      />
    </div>
  );
};

export default Index;
