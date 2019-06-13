import React, { useContext } from 'react';
import Store from './store';
import Module from './module';

const Provider = (props) => {
  const store = props.store;
  store.processReducer();
  return <store.context.Provider value={{ state: store.state, modules: store.modules }}>
    {props.children}
  </store.context.Provider>
}

/**
 * 
 * @param {*} context 
 * @param {*} dataModule 
 * 这个函数用于建立store和数据模块的关联
 */
function createStore(context, dataModule) {
  let modules = [];
  if (Array.isArray(dataModule)) {
    dataModule.forEach(elem => {
      if (typeof (elem) === 'object') {
        elem.context = context;
        modules.push(new Module(elem));
      }
    })
  } else {
    if (typeof (dataModule) === 'object') {
      dataModule.context = context;
      modules.push(new Module(dataModule));
    }
  }
  return new Store({
    context,
    modules,
  })
}

/**
 * @argument 关联dispatch 和 state 到 组件上
 * @param {*} context 
 * @param {*} mapState 
 * @param {*} mapDispatch 
 */
const connect = modules => component => {
  return function wrapComponent(props) {
    let moduleArr = [].concat(modules);
    let contextMap = moduleArr.reduce((out, item) => {
      if (item.context) {
        out.set(item.context,true);
      }
      return out;
    }, new Map())
    contextMap.forEach((flag, context) => {
      useContext(context)
    })
    return component({ ...props});
  }
}

const useRedux = store => Component => {
  return function Privider(props) {
    store.processReducer();
    return <store.context.Provider value={{ state: store.state, modules: store.modules }}>
      <Component {...props}/>
    </store.context.Provider>
  }
}




export {
  useRedux,
  Provider,
  createStore,
  connect,
}