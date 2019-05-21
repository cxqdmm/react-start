import {useState} from 'react';
// 模拟去餐厅吃饭
let store = {
  menu: [],
  selected: [],
}

export default function getStore() {
  return useState(store)
}