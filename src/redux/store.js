import { useState } from 'react';
const _state = Symbol('state');
const _modules = Symbol('module');
export default class Store {
  constructor(props) {
    this._context = props.context;
    this[_state] = {};
    this.modules = props.modules || [];
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

  /**
   * @argument 该函数必须在函数式组件内部使用
   */
  processReducer = () => {
    const out = this.modules.reduce((out, module) => {
      const [state, setState] = useState(module.initialState);
      out.state[module.name] = state;
      module.setState = setState;
      out.modules[module.name] = module.module;
      return out;
    }, {
        state: {},
        modules: new Map(),
      })
    this.state = out.state;
    this.modules = out.modules;
  }
}
