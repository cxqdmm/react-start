// import { observable } from 'redux';
import {observable} from 'mobx';
class shop {
  @observable state = []
  add(goods) {
    this.state.push(goods);
  }
  remove(index) {
    this.state.splice(index);
  }
}
var s = new shop()
console.log(s.state)

export default shop;
