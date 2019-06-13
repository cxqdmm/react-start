import React from 'react';
import '../less/index.module.less'
import { connect } from 'redux';
import shop from '../module/shop';

function ShopPanel(props) {
  return (
    <div styleName="box" className={props.className}>
      <div styleName="head">reducerDemo</div>
      {
        shop.list.map((goods, index) => {
          return <div key={index}>
            <span>{goods.name}</span>
          </div>
        })
      }
    </div>
  )
}

export default connect(shop)(ShopPanel)
