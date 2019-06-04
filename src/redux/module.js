
/**
 * @argument 数据模块
 */
export default class Module {
  constructor(module) {
    this.name = module.name;
    this._module = new module();
    this.initialState = this._module.state;
  }
  get module() {
    return this._module;
  }
}