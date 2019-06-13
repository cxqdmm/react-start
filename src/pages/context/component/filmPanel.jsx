import React from 'react';
import FilmList from './filmList';
import '../less/index.module.less'

function Context_reducer (props){
  return (
    <div styleName="box" className={props.className}>
      <div styleName="head">电影列表（context+hooks）</div>
        <FilmList></FilmList>
    </div>
  )
}
export default Context_reducer;