import React, { useState, useCallback } from 'react';
import { Button, Input } from 'antd';
import shopContext from '../shopContext';
import { connect } from 'redux';
import { ADD_GOODS, REMOVE_GOODS, shopReducer } from '../reducer/shopReducer';
import '../less/index.module.less'

function Film(props) {
  const {
    list,
    dispatchShop
  } = props;

  const [good, setGood] = useState('');
  const addGoods = useCallback(() => {
    if (!good) {
      return;
    }
    // 同步
    // dispatchShop({
    //   type: ADD_GOODS,
    //   name: good
    // });

    // 异步
    dispatchShop((dispatch) => {
      setTimeout(() => {
        dispatch({
          type: ADD_GOODS,
          name: good
        });
      }, 3000)
    })
    setGood('');
  })
  return (
    <div>
      {
        list.map((goods, index) => {
          return <div key={index}>
            <span>{goods.name}</span>
            <Button onClick={() => {
              dispatchShop({
                type: REMOVE_GOODS,
                index: index,
              })
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
    list: state.shopReducer,
  }
}
const mapToDispatch = (dispatch) => {
  return {
    dispatchShop: dispatch.bind(null, shopReducer),
  }
}
export default connect(shopContext, mapToState, mapToDispatch)(Film)