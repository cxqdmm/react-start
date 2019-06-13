import { observable } from 'redux';
import { fetch } from 'util/axios';

class shopModule {
  @observable list = []
  queryShopList() {
    fetch('/shop/queryShopList', 'get').then(res => {
      this.list = res.data.list;
    });
  }
  add(goods) {
    let list = this.list;
    list.push(goods);
    this.setState({
      list: list,
    })
  }
  remove(index) {
    let list = this.list;
    list.splice(index, 1);
    this.setState({
      list: list,
    })
  }
}

export default new shopModule();
