import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';

import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  user: userSlice,
});

const persistConfig = {
  key: 'root',
  timeout: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: true,
});
export const persistor = persistStore(store);
