import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import rootReducer from "./reducers/rootReducers";
import rootSaga from "./saga";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig,rootReducer);
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =  compose;
const Store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

export const persistor = persistStore(Store);

sagaMiddleware.run(rootSaga);

export default Store;