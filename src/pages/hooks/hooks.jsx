import React from 'react';
import { Menu, Icon } from 'antd';
import { Route, Link } from 'react-router-dom';
import './hooks.less';
const SubMenu = Menu.SubMenu;
export default function Hooks(props) {
  return (
    <div styleName="flex root">  
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="appstore" />
              <span>内置hooks</span>
            </span>
          }
        >
          {
            props.route.map(route => {
              return <Menu.Item key={route.path}>
                <Link key={route.path} to={route.path}>{route.title}</Link>
              </Menu.Item>
            })
          }
        </SubMenu>
      </Menu>
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