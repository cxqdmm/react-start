import React from 'react';
import shopContext from '../shopContext';
import '../less/index.module.less'
import { connect } from 'redux';

function ReducerDemo(props) {
  const { list } = props;
  return (
    <div styleName="box" className={props.className}>
      <div styleName="head">reducerDemo</div>
      {
        list.map((goods, index) => {
          return <div key={index}>
            <span>{goods.name}</span>
          </div>
        })
      }
    </div>
  )
}
const mapToState = (state) => {
  return {
    list: state.shop,
  }
}
export default connect(shopContext, mapToState)(ReducerDemo)
