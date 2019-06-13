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
      console.log('dispatch => ',this.constructor.name, 'prop=',prop);
      this[prop] = data[prop];

    })
  }
  get module() {
    return this._module;
  }
}