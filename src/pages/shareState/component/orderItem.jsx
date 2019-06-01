import React from 'react';

export default function OrderItem (props) {
  return (
    <div className="flex vertical" style={{backgroundColor: '#fff', padding: 5}}>
      <span>商品名称: {props.orderName}</span>
      <span>价格: {props.price}</span>
    </div>
  )
}