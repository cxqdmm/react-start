import { useReducer } from 'react';
const _state = Symbol('state');
const _dispatch = Symbol('dispatch');
export default class Store {
  constructor(props) {
    this[_state] = {};
    this.reducers = props.reducers || [];
    this[_dispatch] = new Map();
  }

  get state() {
    return this[_state];
  }

  set state(newState) {
    if (newState !== this[_state]) {
      this[_state] = newState;
    }
  }

  get dispatch() {
    return this[_dispatch];
  }

  set dispatch(newDispatch) {
    if (newDispatch !== this[_dispatch]) {
      this[_dispatch] = newDispatch;
    }
  }

  /**
   * @argument 该函数必须在函数式组件内部使用
   */
  processReducer = () => {
    const out = this.reducers.reduce((out, reducer) => {
      const [value, setValue] = useReducer(reducer.processor, reducer.initialValue);
      out.state[reducer.name] = value;
      out.dispatch[reducer.processor] = setValue;
      return out;
    }, {
        state: {},
        dispatch: {}
      })
    this.state = out.state;
    this.dispatch = out.dispatch;
  }

  /**
   * @argument 根据reducer来触发相对应的dispatch
   * @param {*} reducer 
   * @param {*} action 
   */
  processDispatch = (reducer, action) => {
    if (!this.dispatch[reducer]) {
      throw new Error('processDispatch must use reducer reducer as first parameter');
    } 
    // 异步修改数据
    if (typeof(action) === 'function') {
      return action(this.dispatch[reducer]);
    }
    this.dispatch[reducer](action);
  }
}
