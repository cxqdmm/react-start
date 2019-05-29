import React from 'react';
import Store from './store';
import { Button, Input, Alert } from 'antd';
import Panel from 'view/panel';
export default function UseState(props) {
  const [store, setStore] = Store();
  return (
    <div className="use-state">
      <Panel breadcrumb={['hooks','useState']}>
        <Alert
            message="说明"
            description="useState "
            type="info"
          />
          <Input  placeholder="姓名" value={store.name} onChange={e => {
            setStore(Object.assign({}, store, {
              name: e.target.value,
            }))
          }}/>  姓名: {store.name}
          <Input  placeholder="电话号码" value={store.phone} onChange={e => {
            setStore(Object.assign({}, store, {
              phone: e.target.value,
            }))
          }}/>  电话号码: {store.phone}
      </Panel>
    </div>
  )
}