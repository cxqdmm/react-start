import React from 'react';
import ShopPanel from './component/shopPanel';
import FilmPanel from './component/filmPanel';
import shop from './module/shop';
import film from './module/film';
import { Provider, createStore} from 'redux';
import './less/index.module.less';
const context = React.createContext();
const store = createStore(context, [shop,film]);
function Context (props){
  return (
   <div className="flex">
      <Provider store={store}>
        <ShopPanel className="flex-1" styleName="m-10"></ShopPanel>
        <FilmPanel className="flex-1" styleName="m-10"></FilmPanel>
      </Provider>
   </div>
  )
}
export default Context;