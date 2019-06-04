import { useState } from 'react';
const _state = Symbol('state');
const _dispatch = Symbol('dispatch');
export default class Store {
  constructor(props) {
    this._context = props.context;
    this[_state] = {};
    this.modules = props.modules || [];
    this[_dispatch] = new Map();
  }
  get context() {
    return this._context;
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
    const out = this.modules.reduce((out, module) => {
      const [state, setState] = useState(module.initialState);
      out.state[module.name] = state;
      module.setState = setState;
      out.dispatch[module.name] = module;
      return out;
    }, {
        state: {},
        dispatch: {}
      })
    this.state = out.state;
    this.dispatch = out.dispatch;
  }
}
