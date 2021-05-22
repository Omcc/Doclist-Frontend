import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter,Route,Switch,Redirect} from "react-router-dom"
import axios from "axios"

import {Provider} from "react-redux"
import store, { persistor } from "redux/store";
import { PersistGate } from "redux-persist/integration/react";
import MainRoutes from "MainRoutes"
import {ConnectedRouter} from 'connected-react-router';

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
import {history} from 'redux/store'

import {
  MetronicLayoutProvider,
  MetronicSplashScreenProvider,
  MetronicSubheaderProvider
} from "_metronic/layout";

import {LangI18nProvider,I18nProvider} from "modules/i18n"

_redux.setupAxios(axios,store)

ReactDOM.render(
  <LangI18nProvider>
    <MetronicLayoutProvider>
      <MetronicSubheaderProvider>
        <MetronicSplashScreenProvider>
        <Provider  store={store}>
          <ConnectedRouter history={history}>
            <PersistGate persistor={persistor} loading={null}>
                  <I18nProvider>
                    <MainRoutes />
                  </I18nProvider>
            </PersistGate>
          </ConnectedRouter>
        </Provider>
        </MetronicSplashScreenProvider>
      </MetronicSubheaderProvider>
    </MetronicLayoutProvider>
  </LangI18nProvider>,
  
  
  document.getElementById('root')
);

