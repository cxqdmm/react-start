import React, { useReducer } from 'react';
import { Button } from 'antd';
import { ADD_GOODS, REMOVE_GOODS, shopReducer } from '../reducer/shopReducer';
import '../less/reducer-demo.module.less'
function ReducerDemo (props){
  const [shop, dispatch] = useReducer(shopReducer, []);
  return (
    <div styleName="reducer-demo" className={props.className}>
      <div styleName="head">reducerDemo</div>
      {
        shop.map((goods, index) => {
          return <div key={index}>
            <span>{goods.name}</span>
            <Button onClick={() => {
              dispatch({
                type: REMOVE_GOODS,
                index: index,
              })
            }}>删除</Button>
          </div>
        })
      }
      <Button onClick={() => {
        dispatch({
          type: ADD_GOODS,
          name: 'iphone'
        });
      }}>添加商品</Button>
    </div>
  )
}
export default ReducerDemo;