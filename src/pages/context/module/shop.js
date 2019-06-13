import { observable } from 'redux';

class shopModule {
  @observable list = []
  add(goods) {
    const newList = this.list.push(goods);
    this.setState({
      list: newList,
    })
  }
  remove(index) {
    const newList = this.list.splice(index, 1);
    this.setState({
      list: newList,
    })
  }
}

export default new shopModule();