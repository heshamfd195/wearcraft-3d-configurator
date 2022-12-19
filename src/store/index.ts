import { configureStore } from '@reduxjs/toolkit';
import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
// import storage from 'redux-persist/lib/storage'
import storage from 'redux-persist/lib/storage/session'
import { combineReducers } from '@reduxjs/toolkit'
import appStateReducer from './app-slice'


import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import thunk from 'redux-thunk';
import { getAssetStore } from '../api/queries/get-assetstore';








const persistConfig={
  key:"root",
  version:2,
  blacklist:[getAssetStore.reducerPath],
  storage
}

const reducer =combineReducers({
    appState: appStateReducer,
    [getAssetStore.reducerPath]:getAssetStore.reducer

})

const persistedReducer =persistReducer(persistConfig,reducer)

const store = configureStore({
    reducer: persistedReducer,
  

    middleware:(getDefaultMiddleware)=>(
      getDefaultMiddleware(
     {   serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }}
      ).concat(thunk,getAssetStore.middleware)
    )

  });

  let persistor =persistStore(store);

  export type RootState = ReturnType<typeof store.getState>

  export { store, persistor };
