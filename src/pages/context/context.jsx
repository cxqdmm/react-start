import React, { useReducer } from 'react';
import ReducerDemo from './component/reducer-demo';
import ContextReducerDemo from './component/context-reducer-demo';
import './less/context.module.less';
function Context (props){
  return (
   <div className="flex">
     <ReducerDemo className="flex-1" styleName="m-10"></ReducerDemo>
     <ContextReducerDemo className="flex-1" styleName="m-10"></ContextReducerDemo>
   </div>
  )
}
export default Context;