import React, { useReducer, useContext } from 'react';
import Store from './store';
import Module from './module';

const Provider = (props) => {
  const store = props.store;
  store.processReducer();
  return <store.context.Provider value={{ state: store.state, modules: store.dispatch }}>
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
      if (typeof(elem) === 'function') {
        modules.push(new Module(elem));
      }
    })
  } else {
    if (typeof(dataModule) === 'function') {
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
const connect = (context, mapState, mapDispatch) => (component) => {
  
  return function wrapComponent(props) {
    const _context = useContext(context);
    let stateMap = {};
    let dispatchMap = {};
    if (typeof mapState === 'function') {
      stateMap = mapState(_context.state);
    }
    if (typeof mapDispatch === 'function') {
      dispatchMap = mapDispatch(_context.dispatch);
    }
    return component({...props,...stateMap, ...dispatchMap});
  }
}

const useRedux = store => Component => {
  store.processReducer();
  return <store.context.Provider value={{ state: store.state, dispatch: store.processDispatch }}>
    <Component />
  </store.context.Provider>
}
export { useRedux, Provider, createStore, connect }