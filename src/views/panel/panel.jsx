import React from 'react';
import { Breadcrumb, Layout } from 'antd';
const { Content } = Layout;
export default function Panel(props) {
  return (
    <div>
      <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
      {(props.breadcrumb || []).map((item, index) => {
        return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
      })}
      </Breadcrumb>
      <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
        {props.children}
      </div>
    </Content>
    </div>
  )
}