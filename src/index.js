import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { baseConfig, RouteWithSubRoutes } from './route'
import './css/common.less';
import {
    BrowserRouter as Router
} from 'react-router-dom'
window.auth = true;
ReactDOM.render((
    <Router>
        {
            baseConfig.map(route => (
                <RouteWithSubRoutes key={route.path} {...route}/>
            ))
        }
    </Router>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
