import React, { useState, useCallback } from 'react';
import { Button, Input } from 'antd';
import { connect } from 'redux';
import '../less/index.module.less'
import filmModule from '../module/film';
import { useMounted } from 'hooks';
function FilmList(props) {

  useMounted(() => {
    filmModule.queryFilm();
  })
  filmModule.list.forEach(good => {
    console.log(good.name);
  })
  const [filmname, setFilmname] = useState('');
  const addFilm = useCallback(() => {
    if (!filmname) {
      return;
    }
    filmModule.add({name: filmname});
    setFilmname('');
  })
  return (
    <div>
      {
        filmModule.list.map((goods, index) => {
          return <div key={index}>
            <span>{goods.name}</span>
            <Button onClick={() => {
              filmModule.remove(index);
            }}>删除</Button>
          </div>
        })
      }
      <Input value={filmname} onChange={e => {
        setFilmname(e.target.value);
      }}></Input>
      <Button onClick={addFilm}>添加</Button>
    </div>
  )
}

export default connect(filmModule)(FilmList)