import React, { useReducer, useContext } from 'react';
import Store from './store';
import Reducer from './reducer';
// to to
const useRedux = (reducer) => {
  const context = React.createContext();
  return (component) => {
    return function (props) {
      const [store, dispatch] = useReducer(reducer, {});
      return <context.Provider value={{ ...store, dispatch }}>
        <component {...props} />
      </context.Provider>
    }
  }
}

const Provider = (props) => {
  const store = props.store;
  const context = props.context;
  store.processReducer();
  return <context.Provider value={{ state: store.state, dispatch: store.processDispatch }}>
    {props.children}
  </context.Provider>
}

function createStore(reducer) {
  let reducers = [];
  if (Array.isArray(reducer)) {
    reducer.forEach(elem => {
      if (typeof(elem) === 'function') {
        reducers.push(new Reducer(elem));
      }
    })
    reducers = reducer;
  } else {
    if (typeof(reducer) === 'function') {
      reducers.push(new Reducer(reducer));
    }
  }
  return new Store({
    reducers,
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
export { useRedux, Provider, createStore, connect }