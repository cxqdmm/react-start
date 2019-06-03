import React from 'react';
import Film from './film';
import { shopReducer} from '../reducer/shopReducer';
import shopContext from '../shopContext';
import { Provider, createStore} from '../useRedux';
import '../less/context-reducer-demo.module.less'

const store = createStore(shopReducer);
function Context_reducer (props){
  return (
    <div styleName="context-reducer-demo" className={props.className}>
      <div styleName="head">context+reducer</div>
      <Provider context={shopContext} store={store}>
        <Film></Film>
      </Provider>
    </div>
  )
}
export default Context_reducer;