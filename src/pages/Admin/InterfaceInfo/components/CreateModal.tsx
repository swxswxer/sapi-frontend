import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React, { useEffect, useRef } from 'react';

export type Props = {
  mainColumns: ProColumns<API.InterfaceInfo>[];
  nestedColumns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};

const CreateModal: React.FC<Props> = (props) => {
  const { visible, mainColumns, nestedColumns, onCancel, onSubmit } = props;

  // 使用 useRef 来获取 ProTable 的 form 实例
  const formRef = useRef<any>(null);

  // 将 mainColumns 和 nestedColumns 合并为一个数组
  const combinedColumns = [...mainColumns, ...nestedColumns];

  const handleSubmit = async (value: any) => {
    await onSubmit?.(value);
  };

  useEffect(() => {
    if (!visible && formRef.current) {
      // 关闭 Modal 时重置表单
      formRef.current?.resetFields();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={onCancel}
      centered // 使弹窗居中显示
    >
      <ProTable
        type="form"
        columns={combinedColumns}
        onSubmit={async (value) => {
          handleSubmit(value);
        }}
        formRef={formRef} // 绑定 formRef
      />
    </Modal>
  );
};

export default CreateModal;
