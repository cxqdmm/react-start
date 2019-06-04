import React from 'react';
import Film from './film';
import '../less/index.module.less'

function Context_reducer (props){
  return (
    <div styleName="box" className={props.className}>
      <div styleName="head">context+reducer</div>
        <Film></Film>
    </div>
  )
}
export default Context_reducer;