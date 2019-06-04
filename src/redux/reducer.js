
/**
 * @argument Reducer 管理
 */
export default class Reducer {
  constructor(reducer) {
    this.name = reducer.name;
    this._processor = reducer;
    this.initialValue = reducer();
  }
  get processor() {
    return this._processor;
  }
}