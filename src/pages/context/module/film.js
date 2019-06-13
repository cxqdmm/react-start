import { observable } from 'redux';
import { fetch } from 'util/axios';
class film {
  @observable list = []
  queryFilm() {
    fetch('/film/queryList', 'get').then(res => {
      this.setState({
        list: res.data.list,
      });
    });
  }
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
export default new film();
