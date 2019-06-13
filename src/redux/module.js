import { getObservableProps, setObservablePropDispatch, getObservablePropDispatch} from './observable';
/**
 * @argument 数据模块
 */
export default class Module {
  constructor(module) {
    this.name = module.constructor.name;
    this._module = module;
    // 被观察的属性
    this.observableProps = getObservableProps(this._module);
  }
  getPropValue(prop) {
    return this._module[prop];
  }
  setPropDispatch(prop, dispatch) {
    if (!this._module.setState) {
      this._module.setState = this.setState;
    }
    setObservablePropDispatch(this._module, prop, dispatch);   
  }
  setState(data) {
    const props = Object.getOwnPropertyNames(data);
    props.forEach(prop => {
      const dispatch = getObservablePropDispatch.apply(this, [this, prop]);
      this[prop] = data[prop];
      if (!dispatch) {
        throw new Error(`${prop} is not observable, please use observable decorater to ${prop}`)
      } 
      dispatch(data[prop]);
    })
  }
  get module() {
    return this._module;
  }
}