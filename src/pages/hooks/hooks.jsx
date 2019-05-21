import React from 'react';
import { Breadcrumb } from 'antd';
import { Route, Link, BrowserRouter as Router, } from 'react-router-dom'
export default function Hooks(props) {
  return (
    <div>  
      <Breadcrumb>
        <Breadcrumb.Item>Hooks</Breadcrumb.Item>
      </Breadcrumb>
      {
        props.route.map(route => {
          return <Link key={route.path} to={route.path}>{route.title}</Link>
        })
      }
      <div>
        {
          props.route.map(route => {
            return <Route key={route.path} exact path={route.path} component={route.component}/>
          })
        }
      </div>
    </div>
  );
}