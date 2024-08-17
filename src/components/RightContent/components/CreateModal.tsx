import { Badge, Descriptions, DescriptionsProps, Modal } from 'antd';
import React from 'react';

export type UserModalProps = {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  currentUser: {
    userAccount?: string;
    nickname?: string;
    email?: string;
    phone?: string;
    createTime?: string;
    lastLoginTime?: string;
  };
};

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Product',
    children: 'Cloud Database',
  },
  {
    key: '2',
    label: 'Billing Mode',
    children: 'Prepaid',
  },
  {
    key: '3',
    label: 'Automatic Renewal',
    children: 'YES',
  },
  {
    key: '4',
    label: 'Order time',
    children: '2018-04-24 18:00:00',
  },
  {
    key: '5',
    label: 'Usage Time',
    children: '2019-04-24 18:00:00',
    span: 2,
  },
  {
    key: '6',
    label: 'Status',
    children: <Badge status="processing" text="Running" />,
    span: 3,
  },
  {
    key: '7',
    label: 'Negotiated Amount',
    children: '$80.00',
  },
  {
    key: '8',
    label: 'Discount',
    children: '$20.00',
  },
  {
    key: '9',
    label: 'Official Receipts',
    children: '$60.00',
  },
  {
    key: '10',
    label: 'Config Info',
    children: (
      <>
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
        <br />
      </>
    ),
  },
];

const UserModal: React.FC<UserModalProps> = ({ visible, onOk, onCancel, currentUser }) => {
  return (
    <Modal title="个人中心" visible={visible} onOk={onOk} onCancel={onCancel}>
      <Descriptions bordered>
        <Descriptions.Item label="用户名">{currentUser?.userAccount}</Descriptions.Item>
        <Descriptions.Item label="昵称">{currentUser?.nickname}</Descriptions.Item>
        <Descriptions.Item label="邮箱">{currentUser?.email}</Descriptions.Item>
        <Descriptions.Item label="电话">{currentUser?.phone}</Descriptions.Item>
        <Descriptions.Item label="创建时间">{currentUser?.createTime}</Descriptions.Item>
        <Descriptions.Item label="上次登录时间">{currentUser?.lastLoginTime}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default UserModal;
