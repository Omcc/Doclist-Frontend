import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter,Route,Switch,Redirect} from "react-router-dom"
import Admin from "layouts/Admin.js"
import Client from "layouts/Client.js"

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" component={Admin}/>
      <Route path="/" component={Client} />
    </Switch>
  </BrowserRouter>,

  document.getElementById('root')
);

