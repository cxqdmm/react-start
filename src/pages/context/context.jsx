import React from 'react';
import ShopPanel from './component/shopPanel';
import FilmPanel from './component/filmPanel';
import CollectionPanel from './component/collectionPanel';
import shop from './module/shop';
import film from './module/film';
import { createStore, useRedux } from 'redux';
import './less/index.module.less';
const context = React.createContext();
const store = createStore(context, [shop,film]);
function Context (props){
  return (
    <div>
      <div className="flex">
        <ShopPanel className="flex-1" styleName="m-10"></ShopPanel>
        <FilmPanel className="flex-1" styleName="m-10"></FilmPanel>
      </div>
        <CollectionPanel styleName="m-10"></CollectionPanel>
    </div>
  )
}
export default useRedux(store)(Context);