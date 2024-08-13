import { listInterfaceInfoByPageUsingGet } from '@/services/sapi-backend/interfaceInfoController';
import { PageContainer } from '@ant-design/pro-components';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import ProCard from "@ant-design/pro-card";
import {useNavigate} from "@umijs/max";

/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total, setTotal] = useState<number>(0);
  const navigate = useNavigate(); // 初始化 navigate
  const loadData = async (current = 1, pageSize = 5) => {
    setLoading(true);
    try {
      const res = await listInterfaceInfoByPageUsingGet({
        current,
        pageSize,
      });
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
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

  return (
    <PageContainer title="在线接口开放平台">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 180px)', // 一行显示4个卡片
            gap: '100px', // 卡片间距
            padding: '50px', // 整体内边距
            justifyContent: 'center', // 中心对齐内容
          }}
        >
          {list.map((item) => (
            <ProCard
              key={item.id}
              style={{ height: '220px', width: '180px' }}
              hoverable
              bordered
              onClick={() => handleCardClick(item.id)}
              title={item.description}
            >
              <div>接口名称</div>
              <div>{item.name}</div>
              <div>请求方式</div>
              <div>{item.method}</div>
            </ProCard>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default Index;
