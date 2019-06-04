import React from 'react';
import ReducerDemo from './component/reducer-demo';
import ContextReducerDemo from './component/context-reducer-demo';
import shop from './module/shop';
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
export default Context;