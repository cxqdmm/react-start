import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom'
import loadable from '@loadable/component'
function getComponent(page) {
  return loadable(() => import(/* webpackChunkName:"[request]" */`../pages/${page}/${page}`))
}
const baseConfig = [
  {
    path: '/',
    component: getComponent('home'),
  },
  {
    path: '/home',
    component: getComponent('home'),
  },
]
const pageConfig = [
  {
    path: '/hooks',
    title: 'hooks',
    component: getComponent('hooks'),
    children: [{
      path: '/hooks/why',
      title: 'why hooks',
      component: getComponent('whyHooks'),
    }, {
      path: '/hooks/useState',
      title: 'useState',
      component: getComponent('useState'),
    }, {
      path: '/hooks/shareState',
      title: 'useState如何共享状态',
      component: getComponent('shareState'),
    }],
  },
  {
    path: './context',
    title: 'context',
    component: getComponent('context'),
  }
]
const routerConfig = baseConfig.concat(pageConfig);


const RouteWithSubRoutes = (route) => (
  <Route
    path={route.path}
    exact={route.exact}
    render={(props) => {
      if (route.requestAuth) {
        if (window.auth) {
          return <route.component
            {...props}
            {...route}
          />
        } else {
          return <Redirect
            to={{
              pathname: "/login",
              search: "?utm=your+face",
              state: { referrer: window.location.href }
            }}
          />
        }
      }

      return <route.component
        {...props}
        {...route}
      />

    }}
  />
)
export { routerConfig, pageConfig, RouteWithSubRoutes }