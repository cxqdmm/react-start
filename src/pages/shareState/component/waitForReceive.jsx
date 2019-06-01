import React from 'react';
import useOrder from '../hook/useOrder';
import OrderItem from './orderItem';
export default function waitForReceive(props) {
  const [orders = [], setOrder] = useOrder();
  return (
    <div className={props.className} style={{padding: 10, backgroundColor: '#f0f2f5', margin: 5}}>
      <p>待收货</p>
      {
        orders.map((item, index) => {
          return <OrderItem key={index} {...item} />
        }) 
      }
    </div>
  )
}