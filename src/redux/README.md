# 基于 react context & hooks api 实现简易状态管理

# 使用方法

- 新建数据模块 shop.js
```
  export default class shop {
    state = []
    add(goods) {
      this.state.push(goods);
    }
    remove(index) {
      this.state.splice(index);
    }
  }
```
1. shop模块包含了状态（state）和 action（add、remove），通过action来修改状态。

- 绑定数据模块到指定的上下文
## 入口 entry.js
```
import shop from './shop';
import shopContext from './shopContext';
import { Provider, createStore} from 'redux';
import './less/index.module.less';
const store = createStore(shopContext, shop);
function Context (props){
  return (
   <div className="flex">
      <Provider store={store}>
        <ReducerDemo className="flex-1" styleName="m-10"></ReducerDemo>
        <ContextReducerDemo className="flex-1" styleName="m-10"></ContextReducerDemo>
      </Provider>
   </div>
  )
}
```
## 上下文 shopContext.js
```
import React from 'react';
const context = React.createContext();

export default context;
```
1. const store = createStore(shopContext, shop) 
   把shop模块绑定到上下文shopContext上，得到store,
   可以绑定多个模块到同一个上下文，例如 createStore(shopContext, [shop, learn, ...])
2. <Provider store={store}>...</Provider>
   Provider组件接受store，Provider相当于一个包含store的容器，容器内部的组件共享store

- 在组件中使用数据
```
import shopContext from '../shopContext';
import { connect } from 'redux';

function Film(props) {
  const {
    list,
    shop
  } = props;

  return <div>
    {
      list.map(item => {
        return <span>{item.name}</span>
      })
    }
    <a onClick={() => {
      shop.add({name:1})
    }}></a>
  </div>
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
```