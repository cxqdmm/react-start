import React, { useState, useCallback } from 'react';
import '../less/index.module.less'
import { connect } from 'redux';
import shopModule from '../module/shop';
import { useMounted } from 'hooks';
import { Table, Input, Button } from 'antd';
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '金额',
    dataIndex: 'cost',
    key: 'cost',
  },
];
function ShopPanel(props) {
  useMounted(() => {
    shopModule.queryShopList();
  })
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const add = useCallback(() => {
    if (!name) {
      return;
    }
    shopModule.add({name: name, cost: cost});
    setName('');
    setCost('');
  })
  return (
    <div styleName="box" className={props.className}>
      <div styleName="head">购物（context+hooks）</div>
      <div>
        <Table dataSource={shopModule.list} columns={columns} pagination={false}/>
        <div styleName="panel-action">
          <span styleName="label">名称:</span>
          <Input styleName="input" value={name} onChange={e => {
            setName(e.target.value);
          }}></Input>
          <span styleName="label">￥:</span>
          <Input styleName="input" value={cost} onChange={e => {
            setCost(e.target.value);
          }}></Input>
          <Button styleName="btn-add" onClick={add}>添加</Button>
        </div>
      </div>
    </div>
  )
}

export default connect(shopModule)(ShopPanel)
