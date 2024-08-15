// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** listTopInvokeInterfaceInfo GET /api/analysis/top/interface/invoke */
export async function listTopInvokeInterfaceInfoUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListInterfaceInfoVO>('/api/analysis/top/interface/invoke', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getTotalNumById GET /api/analysis/totalNum */
export async function getTotalNumByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTotalNumByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<number>('/api/analysis/totalNum', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
