import { detaillist } from '@/services/order';
import type {ProColumns } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import React, {useState } from 'react';

type DetailInfo = {
  id: number;
  orderNo: string;
  name:string;
  number: number;
  unit:string;
  price: number;
  total: number;
  remark: string;
};

const Detail: React.FC = () => {
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const columns: ProColumns<DetailInfo>[] = [
    {
      title: '维修编号',
      dataIndex: 'orderNo',
      search: true,
    },
    {
      title: '维修项目',
      dataIndex: 'name',
      search: true,
    },
    {
      title: '数量',
      dataIndex: 'number',
      search: false,
    },
    {
      title: '单位',
      dataIndex: 'unit',
      search: false,
    },
    {
      title: '价格',
      dataIndex: 'price',
      search: false,
    },

    {
      title: '金额',
      dataIndex: 'total',
      search: false,
    },
    {
      title: '订单时间',
      dataIndex: 'total',
      search: false,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      search: false,
    },
  
  ];

  const requestData = (params?: API.PageParams) => {
    setCurrent(params?.current ?? 1);
    setPageSize(params?.pageSize ?? 10);
    return detaillist(params).then((res: API.Result) => {
      return {
        data: res.data.records,
        success: true,
        total: res.data.total,
      };
    });
  };

  

   return (
    <PageContainer>
      <ProTable
        request={(params) => requestData(params)}
        pagination={{ pageSize, current }}
        columns={columns}
        rowKey={(item) => item.id}
    
      ></ProTable>
    </PageContainer>
  );
};

export default Detail;
