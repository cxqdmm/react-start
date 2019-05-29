import React from 'react';
import { Menu, Icon } from 'antd';
import { Route, Link } from 'react-router-dom';
import './hooks.module.less';
const SubMenu = Menu.SubMenu;
export default function Hooks(props) {
  return (
    <div className="flex" styleName="root">  
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={[props.route[0].path]}
        defaultOpenKeys={['sub1']}
        theme="dark"
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
      <div className="flex-1">
        {
          props.route.map(route => {
            return <Route key={route.path} exact path={route.path} component={route.component}/>
          })
        }
      </div>
    </div>
  );
}