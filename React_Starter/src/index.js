import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
  // Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'

// Containers
import Full from './containers/Full/'

// views
import Login from './views/Pages/Login/'
import Register from './views/Pages/Register/'
import Page404 from "./views/Pages/Page404/Page404";
import Page500 from "./views/Pages/Page500/Page500";
import registerServiceWorker from "./registerServiceWorker";

import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n';

import 'd3';


const history = createBrowserHistory();

ReactDOM.render((
    <I18nextProvider i18n={i18n}>
        <HashRouter history={history}>
            <Switch>
                <Route exact path="/cxo/login" name="Login Page" component={Login}/>
                <Route exact path="/cxo/register" name="Register Page" component={Register}/>
                <Route exact path="/404" name="Page 404" component={Page404}/>
                <Route exact path="/500" name="Page 500" component={Page500}/>
                <Route path="/" name="Home" component={Full}/>
            </Switch>
        </HashRouter>
    </I18nextProvider>
), document.getElementById('root'));
registerServiceWorker();

