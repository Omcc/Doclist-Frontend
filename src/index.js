import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter,Route,Switch,Redirect} from "react-router-dom"

import {Provider} from "react-redux"
import store, { persistor } from "redux/store";
import { PersistGate } from "redux-persist/integration/react";
import MainRoutes from "MainRoutes"

import "./index.scss"; // Standard version
// import "./sass/style.react.rtl.css"; // RTL version
import "./_metronic/_assets/plugins/keenthemes-icons/font/ki.css";
import "socicon/css/socicon.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./_metronic/_assets/plugins/flaticon/flaticon.css";
import "./_metronic/_assets/plugins/flaticon2/flaticon.css";
// Datepicker
import "react-datepicker/dist/react-datepicker.css";

ReactDOM.render(
  <Provider  store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </PersistGate>
    
  </Provider>,
  
  document.getElementById('root')
);

