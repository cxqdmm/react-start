import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom'
import loadable from '@loadable/component'
function getComponent(page) {
    return loadable(() => import(/* webpackChunkName:"[request]" */`../pages/${page}/${page}`))
}
const routerConfig = [
    {
      path: '/',
      component: getComponent('hooks'),
      route: [{
        title: 'useState',
        path: '/hooks/useState',
        component: getComponent('useState'),
      }],
    },
    {
        path: '/hooks',
        component: getComponent('hooks'),
        route: [{
          title: 'useState',
          path: '/hooks/useState',
          component: getComponent('useState'),
        }],
    },
]



const RouteWithSubRoutes = (route) => (
    <Route
        path={route.path}
        exact= {route.exact}
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
export  { routerConfig, RouteWithSubRoutes }