import { request } from '@umijs/max';

//获取订单的列表
export async function list(options?: { [key: string]: any }) {
  return request<API.Result>('/api/order/list', {
    method: 'GET',
    params:{
      ...(options || {}),

    }
  });
}

//订单明细
export async function detail(options?: { [key: string]: any }) {
  return request<API.Result>('/api/order/detail', {
    method: 'GET',
    params: {
      ...(options || {}),
    },
  });
}

//保存订单
export async function save(options?: { [key: string]: any}) {
  return request<{
    data: API.Result;
  }>('/api/order/save', {
    method: 'post',
    data: options
  });
  
}


//删除订单
export async function delete1(options?: { [key: string]: any}) {
  return request<{
    data: API.Result;
  }>('/api/order/delete', {
    method: 'post',
    data: options
  });
  
}

//获取订单的列表
export async function detaillist(options?: { [key: string]: any }) {
  return request<API.Result>('/api/detail/list', {
    method: 'GET',
    params:{
      ...(options || {}),

    }
  });
}