import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter,Route,Switch,Redirect} from "react-router-dom"
import axios from "axios"

import {Provider} from "react-redux"
import store, { persistor } from "redux/store";
import { PersistGate } from "redux-persist/integration/react";
import MainRoutes from "MainRoutes"
import { I18nProvider } from "_metronic/i18n";
import * as _redux from "./redux"

import "./index.scss"; // Standard version
// import "./sass/style.react.rtl.css"; // RTL version
import "./_metronic/_assets/plugins/keenthemes-icons/font/ki.css";
import "socicon/css/socicon.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./_metronic/_assets/plugins/flaticon/flaticon.css";
import "./_metronic/_assets/plugins/flaticon2/flaticon.css";
// Datepicker
import "react-datepicker/dist/react-datepicker.css";

import {
  MetronicLayoutProvider,
  MetronicSplashScreenProvider,
  MetronicSubheaderProvider
} from "_metronic/layout";

import {MetronicI18nProvider} from "_metronic/i18n";

_redux.setupAxios(axios,store)

ReactDOM.render(
  <MetronicI18nProvider>
    <MetronicLayoutProvider>
      <MetronicSubheaderProvider>
        <MetronicSplashScreenProvider>
        <Provider  store={store}>
          <PersistGate persistor={persistor} loading={null}>
             <BrowserRouter>
                <I18nProvider>
                  <MainRoutes />
                </I18nProvider>
              </BrowserRouter>
          </PersistGate>
        </Provider>
        </MetronicSplashScreenProvider>
      </MetronicSubheaderProvider>
    </MetronicLayoutProvider>
  </MetronicI18nProvider>,
  
  
  document.getElementById('root')
);

