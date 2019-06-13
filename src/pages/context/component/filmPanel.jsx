import React, { useState, useCallback } from 'react';
import { Button, Input, Table } from 'antd';
import { connect } from 'redux';
import '../less/index.module.less'
import filmModule from '../module/film';
import { useMounted } from 'hooks';
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '金额',
    dataIndex: 'cost',
    key: 'cost',
  },
];
function filmPanel (props){
  useMounted(() => {
    filmModule.queryFilm();
  })
  const [filmname, setFilmname] = useState('');
  const [cost, setCost] = useState('');
  const addFilm = useCallback(() => {
    if (!filmname) {
      return;
    }
    filmModule.add({name: filmname, cost: cost});
    setFilmname('');
  })
  return (
    <div styleName="box" className={props.className}>
      <div styleName="head">电影列表（context+hooks）</div>
      <div>
        <Table dataSource={filmModule.list} columns={columns} pagination={false}/>
        <div styleName="panel-action">
          <span styleName="label">名称:</span>
          <Input styleName="input" value={filmname} onChange={e => {
            setFilmname(e.target.value);
          }}></Input>
          <span styleName="label">￥:</span>
          <Input styleName="input" value={cost} onChange={e => {
            setCost(e.target.value);
          }}></Input>
          <Button styleName="btn-add" onClick={addFilm}>添加</Button>
        </div>
      </div>
    </div>
  )
}
export default connect(filmModule)(filmPanel)