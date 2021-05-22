import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {reduxBatch} from "@manaflair/redux-batch";
import {persistStore} from "redux-persist"
import { rootReducer,rootSaga } from "./rootReducer";
import {routerMiddleware} from "connected-react-router"
import { createBrowserHistory } from "history";


const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory({basename:'/'});

const middleware = [
    ...getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
        thunk: true
    }),
    sagaMiddleware,
    routerMiddleware(history)
];


const store = configureStore({
    reducer:rootReducer(history),
    middleware,
    devTools: process.env.NODE_ENV !== "production",
    enhancers: [reduxBatch]
})

export const persistor= persistStore(store);

sagaMiddleware.run(rootSaga);


export default store