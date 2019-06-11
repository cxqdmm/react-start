import React, { useState, useCallback } from 'react';
import { Button, Input } from 'antd';
import shopContext from '../shopContext';
import { connect } from 'redux';
import '../less/index.module.less'

function Film(props) {
  const {
    list,
    shop
  } = props;

  const [good, setGood] = useState('');
  const addGoods = useCallback(() => {
    if (!good) {
      return;
    }
    shop.add({name: good});
    setGood('');
  })
  return (
    <div>
      {
        list.map((goods, index) => {
          return <div key={index}>
            <span>{goods.name}</span>
            <Button onClick={() => {
              shop.remove(index);
            }}>删除</Button>
          </div>
        })
      }
      <Input value={good} onChange={e => {
        setGood(e.target.value);
      }}></Input>
      <Button onClick={addGoods}>添加商品</Button>
    </div>
  )
}

const mapToState = (state) => {
  return {
    list: state.shop,
  }
}
const mapToModule = (modules) => {
  return {
    shop: modules.shop,
  }
}
export default connect(shopContext, mapToState, mapToModule)(Film)