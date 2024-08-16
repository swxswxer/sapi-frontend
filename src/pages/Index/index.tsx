import { getTotalNumByIdUsingGet } from '@/services/sapi-backend/analysisController';
import {
  getCountUsingGet,
  listInterfaceInfoByPageUsingGet,
} from '@/services/sapi-backend/interfaceInfoController';
import { BarChartOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';
import { message, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

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

const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [totals, setTotals] = useState<{ [key: number]: number }>({});
  const [totalItems, setTotalItems] = useState<number>(0); // 用于存储总条数
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();

  // 获取总条数
  const fetchTotalCount = async () => {
    try {
      const res = await getCountUsingGet();
      setTotalItems(res?.data || 0);
    } catch (error: any) {
      message.error('获取总条数失败，' + error.message);
    }
  };

  const loadData = async (current = 1, pageSize = 8) => {
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
    fetchTotalCount(); // 获取总条数
    loadData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
        itemCardProps={{
          ghost: false,
        }}
        pagination={{
          total: totalItems, // 设置总条数
          pageSize: 8,
          current: currentPage,
          showSizeChanger: false,
          onChange: handlePageChange, // 页码切换时触发的函数
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
                {record.status === 0 ? '未上线' : record.method}
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
