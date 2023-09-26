import { ApplicationInitStatus, InjectionToken } from '@angular/core';
import {
  createStore,
  Store,
  compose,
  StoreEnhancer,
  combineReducers,
} from 'redux';

import { AppState } from './app.state';
import { appReducer } from './app.reducer';
import { configureStore } from '@reduxjs/toolkit';

export const AppStore = new InjectionToken('App.store');

export function createAppStore() {
  const store = configureStore({
    reducer: appReducer,
  });

  return store;
}

export const appStoreProviders = [
  { provide: AppStore, useFactory: createAppStore },
];
