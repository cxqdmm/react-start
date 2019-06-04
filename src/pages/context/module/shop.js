
export default class shop {
  state = []
  add(goods) {
    this.state.push(goods);
  }
  remove(index) {
    this.state.splice(index);
  }
}
