import { Request, Response } from 'express';

function list(req: Request, res: Response) {
  res.send({ 
    data:{
      records: [{
          "id":1,
    "orderNo":"BY20231012",
    "partnerName":"zhangsan",
    "phone":"19957136623",
    "length":389023,
    "carNo":"浙A40B5B",
    "carType":"234356",
    "maintainType":"维修",
    "receiveUser":"二文",
    "maintainUser":"二文",
    "operatorUser:":"二文",
    "inTime":"2024-10-22",
    "outTime":"2024-10-23",
    "totalMoney":420.5,
      }], 
      total:1,
    },
 success: true });
}

function detail(req: Request, res: Response) {
  res.send({
    data: [
      'ktp_result',
      'id_number_deivice',
      'phone_device',
      'nova',
      'nova-service',
      'lich',
      'oversea',
    ],
    success: true,
    total:1,
  });
}

function save(req: Request, res: Response) {
  res.send({
    data: [
      { id: 123, name: '张三', gmt_create: '2020-12-12' },
      { id: 124, name: '李四', gmt_create: '2020-12-12' },
      { id: 125, name: '王五', gmt_create: '2020-12-12' },
    ],
    success: true,
  });
}

export default {
  'GET /api/order/list': list,
  'GET /api/order/detail': detail,
  'GET /api/order/save': save,
};
