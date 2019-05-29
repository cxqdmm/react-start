import React, { useState } from 'react';
import { Input } from 'antd';
import Panel from 'view/panel';
import Codebox from 'view/codebox/index';
import txt from './useState.txt';

export default function UseState(props) {
  const [state, setState] = useState({name:'', phone:''});
  return (
    <div className="use-state">
      <Panel breadcrumb={['hooks','useState']}>
          <Codebox code={txt}></Codebox>
          <Input  placeholder="姓名" value={state.name} onChange={e => {
            setState(Object.assign({}, state, {
              name: e.target.value,
            }))
          }}/>  姓名: {state.name}
          <Input  placeholder="电话号码" value={state.phone} onChange={e => {
            setState(Object.assign({}, state, {
              phone: e.target.value,
            }))
          }}/>  电话号码: {state.phone}
      </Panel>
    </div>
  )
}