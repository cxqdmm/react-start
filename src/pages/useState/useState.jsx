import React from 'react';
import Store from './store';
import { Breadcrumb, Button} from 'antd';

export default function UseState(props) {
  const [store, setStore] = Store();
  return (
    <div>
      <Button type="primary">Primary</Button>
      <Breadcrumb>
        <Breadcrumb.Item>UseState</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}