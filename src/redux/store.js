import { useState } from 'react';
const _state = Symbol('state');
const _modules = Symbol('module');
export default class Store {
  constructor(props) {
    this._context = props.context;
    this[_state] = {};
    this._modules = props.modules || [];
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
    const out = this._modules.reduce((out, module) => {
      out.state[module.name] = {};
      module.observableProps.forEach(prop => {
        let value = module.getPropValue(prop)
        const [state, setState] = useState(value);
        out.state[module.name][prop] = state;
        module.setPropDispatch(prop, setState);
      })
      out.modules[module.name] = module.module;
      return out;
    }, {
        state: {},
        modules: {},
      })
    this.state = out.state;
    this.modules = out.modules;
  }
}
