import React from 'react';
import { Menu } from 'antd';
import { Route, Link } from 'react-router-dom';
import {pageConfig} from 'src/route'
import './home.module.less';
import {flattenDeep} from 'lodash';
const SubMenu = Menu.SubMenu;

const createRoute = (routes) => {
  const routeComps = routes.map(route => {
      let components = []
      const component = <Route key={route.path} exact path={route.path} component={route.component}/>
      components.push(component);
      if (route.children) {
         const childComponents = createRoute(route.children);
         components = components.concat(childComponents);
      }
      return components;
  })
  return flattenDeep(routeComps);
}

export default function Hooks(props) {
  return (
    <div className="flex" styleName="root">  
      <Menu
        style={{ width: 256 }}
        theme="dark"
        mode="inline"
      >
        {
          pageConfig.map((item, index) => {
            return <SubMenu
            key={index}
            title={
              <span>
                <span>{item.title}</span>
              </span>
            }
          >
            {
              item.children ? item.children.map(route => {
                return <Menu.Item key={route.path}>
                  <Link key={route.path} to={route.path}>{route.title}</Link>
                </Menu.Item>
              }) : null
            }
          </SubMenu>
          })
        }
      </Menu>
      <div className="flex-1">
        {
          createRoute(pageConfig)
        }
      </div>
    </div>
  );
}