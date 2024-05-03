import { list, detail,save,delete1 } from '@/services/order';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  PageContainer,
  ProForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormList,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Modal, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';

type Detail={
  id: number;
  orderNo: string;
  name:string;
  number: number;
  unit:string;
  price: number;
  total: number;
  remark: string;
}

type OrderInfo = {
  id: number;
  orderNo: string;
  partnerName: string;
  phone: string;
  length: number;
  carNo: string;
  carType: string;
  maintainType: string;
  receiveUser: string;
  maintainUser: string;
  operatorUser: string;
  inTime: string;
  outTime: string;
  totalMoney: number;
  details: Detail[];
};

const Order: React.FC = () => {
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [model, setModel] = useState<{ open: boolean; edit: boolean }>({
    open: false,
    edit: false,
  });
  const [record, setRecord] = useState<OrderInfo>();
  const actionRef = useRef<ActionType>();

  const seeDetail = (id: number)=>{
  
    return detail({id}).then( (res:API.Result) => {
      setRecord(res.data);
      setModel({ open: true, edit: false });
    });

  }


  const closeById = (id: number)=>{
  
    return delete1({id}).then((res:API.Result)=> {
      if (res.msg) {
        message.error(res.msg);
      } else {
        message.success('删除成功');
      }
      actionRef.current?.reload();
    } ).catch((err) => {
      console.log(err);
      message.error('删除订单失败');
      actionRef.current?.reload();
    });

  }
  const addOrder = (params: Record<string, any>) => {
    if(params.details.length === 0){
      message.error('请添加维修明细');
      return;
    }
    return save(params)
      .then((res: API.Result) => {
        if (res.msg) {
          message.error(res.msg);
        } else {
          message.success('操作成功');
        }
        setModel({ open: false, edit: false });
        setRecord(undefined);
        actionRef.current?.reload();
      })
      .catch((err) => {
        console.log(err);
        message.error('保存订单失败');
        actionRef.current?.reload();
      });
  };

  const columns: ProColumns<OrderInfo>[] = [
    {
      title: '维修单号',
      dataIndex: 'orderNo',
      search: true,
    },
    {
      title: '客户名称',
      dataIndex: 'partnerName',
      search: true,
    },
    {
      title: '客户电话',
      dataIndex: 'phone',
      search: true,
    },
    {
      title: '车牌号',
      dataIndex: 'carNo',
      search: true,
    },
    {
      title: '进厂日期',
      dataIndex: 'inTime',
      search: false,
    },
    {
      title: '出场日期',
      dataIndex: 'inTime',
      search: false,
    },
    {
      title: '维修金额',
      dataIndex: 'totalMoney',
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key={record.id + 'edit'}
          onClick={() => {
            seeDetail(record.id??0)
          }}
        >
          查看明细
        </a>,
        <Popconfirm
          key={record.id}
          title="你确定删除吗，删除后数据将不可恢复?"
          onConfirm={() => closeById(record.id ?? 0)}
          okText="确定"
          cancelText="取消"
        >
          <a key={record.id + '删除'}> 删除</a>
        </Popconfirm>,
      ],
    },
  ];

  const requestData = (params?: API.PageParams) => {
    setCurrent(params?.current ?? 1);
    setPageSize(params?.pageSize ?? 10);
    return list(params).then((res: API.Result) => {
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
        actionRef={actionRef}
        pagination={{ pageSize, current }}
        columns={columns}
        rowKey={(item) => item.id}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setRecord(undefined);
              setModel({ open: true, edit: true });
            }}
          >
            <PlusOutlined /> 新增单号
          </Button>,
        ]}
      ></ProTable>

      <Modal
        open={model.open}
        onCancel={() => {
          setRecord(undefined);
          setModel({ open: false, edit: false });
        }}
        destroyOnClose
        footer={null}
        width={1200}
      >
        <ProForm
          //readonly={!model.edit}
          layout={'vertical'}
          grid={true}
          rowProps={{
            gutter: [16, 0],
          }}
          submitter={model.edit ? {} : false}
          onFinish={(formdata: Record<string, any>) => {
            return addOrder(formdata);
          }}
        >
          <ProFormText
            colProps={{ md: 12, xl: 8 }}
            name="partnerName"
            label="客户名称"
            width="md"
            tooltip="请输入客户名称"
            disabled={!model.edit}
            rules={[{ required: true }]}
            initialValue={record && record?.partnerName}
          />

          <ProFormText
            colProps={{ md: 12, xl: 8 }}
            name="phone"
            label="客户手机号"
            width="md"
            tooltip="请输入符合规范的手机号"
            disabled={!model.edit}
            initialValue={record && record?.phone}
          />

          <ProFormDigit
            colProps={{ md: 12, xl: 8 }}
            name="length"
            label="进厂里程"
            width="md"
            tooltip="进厂里程"
            disabled={!model.edit}
            initialValue={record && record?.length}
          />

          <ProFormText
            colProps={{ md: 12, xl: 8 }}
            name="carNo"
            label="车牌号"
            width="md"
            tooltip="请输入车牌号"
            rules={[{ required: true }]}
            disabled={!model.edit}
            initialValue={record && record?.carNo}
          />
          <ProFormText
            colProps={{ md: 12, xl: 8 }}
            name="carType"
            label="车辆类型"
            width="md"
            tooltip="请输入车牌号"
            rules={[{ required: true }]}
            disabled={!model.edit}
            initialValue={record && record?.carType}
          />
          <ProFormText
            colProps={{ md: 12, xl: 8 }}
            name="maintainType"
            label="维修类型"
            width="md"
            tooltip="请输入维修类型"
            disabled={!model.edit}
            initialValue={record && record?.maintainType}
          />
          <ProFormText
            colProps={{ md: 12, xl: 8 }}
            name="receiveUser"
            label="接车人"
            width="md"
            tooltip="请输入车牌号"
            disabled={!model.edit}
            initialValue={record && record?.receiveUser}
          />
          <ProFormText
            colProps={{ md: 12, xl: 8 }}
            name="maintainUser"
            label="维修人员"
            width="md"
            tooltip="请输入维修人员"
            disabled={!model.edit}
            initialValue={record && record?.maintainUser}
          />
          <ProFormText
            colProps={{ md: 12, xl: 8 }}
            name="operatorUser"
            label="操作人员"
            width="md"
            tooltip="请输入车牌号"
            disabled={!model.edit}
            initialValue={record && record?.operatorUser}
          />
          <ProFormDatePicker
            colProps={{ md: 12, xl: 8 }}
            name="inTime"
            label="入场时间"
            width="md"
            placeholder="请选择"
            tooltip="请选择入场时间"
            rules={[{ required: true }]}
            disabled={!model.edit}
            initialValue={record && record?.inTime}
          />
          <ProFormDatePicker
            colProps={{ md: 12, xl: 8 }}
            name="outTime"
            label="出场时间"
            width="md"
            tooltip="请选择出场时间"
            placeholder="请选择"
            rules={[{ required: true }]}
            disabled={!model.edit}
            initialValue={record && record?.outTime}
          />
          <ProFormText
            colProps={{ md: 12, xl: 8 }}
            name="orderNo"
            label="维修单号"
            width="md"
            tooltip="系统默认"
            disabled={true}
            placeholder="系统默认"
            initialValue={record && record?.orderNo}
          />

          <ProFormList
            name="details"
            initialValue={record && record.details}
            creatorButtonProps={model.edit ? {
              position: 'bottom',
              creatorButtonText: '维修明细',
            } : false}
            copyIconProps={model.edit? {} :false}
            deleteIconProps={model.edit? {} :false}
          >
            <ProForm.Group>
              <ProFormText
                colProps={{ md: 8, xl: 5 }}
                name="name"
                label="维修项目"
                width="md"
                tooltip="系统默认"
                placeholder="项目名称"
                disabled={!model.edit}
                rules={[{ required: true, max: 50, message: '请少于50个汉字' }]}
              />

              <ProFormDigit
                colProps={{ md: 4, xl: 2 }}
                name="number"
                label="数量"
                width="md"
                tooltip="输入数字类型"
                placeholder="数量"
                disabled={!model.edit}
                rules={[{ required: true }]}
              />
              <ProFormText
                colProps={{ md: 4, xl: 2 }}
                name="unit"
                label="单位"
                width="md"
                tooltip="单位"
                placeholder="数量"
                disabled={!model.edit}
                rules={[{ required: true, max: 10, message: '请少于10个汉字' }]}
              />
              <ProFormDigit
                colProps={{ md: 6, xl: 2 }}
                name="price"
                label="价格"
                width="md"
                tooltip="输入数字类型"
                placeholder="价格"
                disabled={!model.edit}
                rules={[{ required: true }]}
              />
              <ProFormDigit
                colProps={{ md: 6, xl: 2 }}
                name="total"
                label="金额"
                width="md"
                tooltip=""
                placeholder="金额"
                disabled={!model.edit}
                rules={[{ required: true }]}
              />
              <ProFormText
                colProps={{ md: 8, xl: 10 }}
                name="remark"
                label="备注"
                width="md"
                tooltip="备注"
                placeholder="备注"
                disabled={!model.edit}
                rules={[{ max: 120, message: '请少于120个汉字' }]}
              />
            </ProForm.Group>
          </ProFormList>
        </ProForm>
      </Modal>
    </PageContainer>
  );
};

export default Order;
