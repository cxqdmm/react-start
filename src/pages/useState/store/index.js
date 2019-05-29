import {useState} from 'react';
// 模拟去餐厅吃饭
let store = {
  name: '',
  phone: '',
}

export default function getStore() {
  return useState(store)
}