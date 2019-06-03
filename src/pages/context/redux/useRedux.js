import React, { useReducer } from 'react';
import Store from './store';
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
  const [value, dispatch] = useReducer(store.reducer, store.current);
  return <context.Provider value={{ ...value, dispatch }}>
    {props.children}
  </context.Provider>
}

function createStore(reducer) {
  let reducers = [];
  if (Array.isArray(reducer)) {
    reducers = reducer;
  } else {
    reducers = [reducer];
  }
  return new Store({
    reducers,
  })
}

export { useRedux, Provider, createStore }