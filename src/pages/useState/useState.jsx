import React from 'react';
import Store from './store';
import { Breadcrumb, Button, Input, Layout } from 'antd';
const { Content } = Layout;
export default function UseState(props) {
  const [store, setStore] = Store();
  return (
    <div className="use-state">
      <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>hooks</Breadcrumb.Item>
        <Breadcrumb.Item>useState</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>Content</div>
    </Content>
    </div>
  )
}