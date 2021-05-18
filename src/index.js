import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import { watchCollectionSaga } from "./store/WatcherSagas";
import { watchAuthSaga } from "./store/WatcherSagas";
import { watchMetadataSaga } from "./store/WatcherSagas";

import { authReducer } from "./store/auth/reducer";
import { collectionReducer } from "./store/collection/reducer";
import { metadataReducer } from "./store/metadata/reducer";

import App from "./App";


const sagaMiddleware = createSagaMiddleware();



const rootReducer = combineReducers({
  auth: authReducer,
  collection: collectionReducer,
  metadata: metadataReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchCollectionSaga);
sagaMiddleware.run(watchAuthSaga);
sagaMiddleware.run(watchMetadataSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
