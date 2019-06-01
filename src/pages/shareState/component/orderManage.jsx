import React from 'react';
import { Button } from 'antd';
import useOrder from '../hook/useOrder';
import OrderItem from './orderItem';
export default function orderManage(props) {
  const [orders = [], setOrder] = useOrder();
  return (
    <div className={props.className} style={{padding: 10, backgroundColor: '#f0f2f5', margin: 5}}>
      <p>订单</p>
      {
        orders.map((item, index) => {
          return <OrderItem key={index} {...item} />
        }) 
      }
      <Button type="primary" onClick={() => {
        setOrder([].concat(orders,[{
          orderName: 'mac pro',
          price: 13000
        }]))
      }}>添加订单</Button>
    </div>
  )
}