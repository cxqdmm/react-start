import { useState } from 'react';

const order = [{
  orderName: 'iphone X',
  price: '8000',
}];

export default function userOrder() {
  return useState(order);
};