import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React, { useEffect, useRef } from 'react';

export type Props = {
  values: API.InterfaceInfo;
  mainColumns: ProColumns<API.InterfaceInfo>[];
  nestedColumns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};

const UpdateModal: React.FC<Props> = (props) => {
  const { values, visible, mainColumns, nestedColumns, onCancel, onSubmit } = props;

  const formRef = useRef<ProFormInstance>();
  const combinedColumns = [...mainColumns, ...nestedColumns];
  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue(values);
    }
  }, [values]);

  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={onCancel}
      centered // 使弹窗居中显示
    >
      <ProTable
        type="form"
        formRef={formRef}
        columns={combinedColumns}
        onSubmit={async (value) => {
          onSubmit?.(value);
        }}
      />
    </Modal>
  );
};
export default UpdateModal;
