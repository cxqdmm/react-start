import { observable } from 'redux';
import { fetch } from 'util/axios';


class film {
  @observable list = []
  queryFilm() {
    fetch('/film/queryList', 'get').then(res => {
      this.list = res.data.list;
    });
  }
  add(goods) {
    const list = this.list;
    list.push(goods);
    this.list = list;
  }
  remove(index) {
    const list = this.list;
    list.splice(index, 1);
    this.setState({
      list: list,
    })
  }
}

export default new film();
