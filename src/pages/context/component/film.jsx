import React, {useContext} from 'react';
import { Button } from 'antd';
import shopContext from '../shopContext';
export default function Film(props) {
  const context = useContext(shopContext);
  return (
    <div className="flex vertical" style={{ backgroundColor: '#fff', padding: 5 }}>
      <span>电影名称: </span>
      <Button >修改名称</Button>
    </div>
  )
}