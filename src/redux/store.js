import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import { devToolsEnhancer } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";

const configureStore = () => {
  const persistConfig = {
    key: "root",
    storage,
  };

  const appReducer = combineReducers({
    userData: userReducer,
  });

  const persistedReducer = persistReducer(persistConfig, appReducer);

  const composedEnhancers = compose(applyMiddleware(thunk), devToolsEnhancer());

  const store = createStore(persistedReducer, composedEnhancers);
  const persistor = persistStore(store);

  return { store, persistor };
};

export default configureStore;
