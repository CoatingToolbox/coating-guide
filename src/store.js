/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { createStore, compose as origCompose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';

import appReducer from './reducers/app-reducer.js';
import tabletReducer from './reducers/tablet-reducer.js';
import panReducer from './reducers/pan-reducer.js';
import coatingReducer from './reducers/coating-reducer.js';
import coatingAmountReducer from './reducers/coating-amount-reducer.js';

// Sets up a Chrome extension for time travel debugging.
// See https://github.com/zalmoxisus/redux-devtools-extension for more information.
const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || origCompose;

// Initializes the Redux store with a lazyReducerEnhancer (so that you can
// lazily add reducers after the store has been created) and redux-thunk (so
// that you can dispatch async actions). See the "Redux and state management"
// section of the wiki for more details:
// https://github.com/Polymer/pwa-starter-kit/wiki/4.-Redux-and-state-management

const rootReducer = (state = {}, action = {}) => {
  const app = appReducer(state.app, action);
  const tablet = tabletReducer(state.tablet, action);
  const pan = panReducer(state.pan, action);
  const coating = coatingReducer(state.coating, action);
  const coatingAmount = coatingAmountReducer(state.coatingAmount, action, tablet, coating);
  
  return Object.assign({}, state, 
    {
      app,
      tablet,
      pan,
      coating,
      coatingAmount
    });
};

export const store = createStore(
  rootReducer,
  compose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk))
);

// Initially loaded reducers.
// store.addReducers({
//   app: appReducer,
//   tablet: tabletReducer,
//   pan: panReducer,
//   coating: coatingReducer,
//   coatingAmount: coatingAmountReducer(state.coatingAmount, action, this.tablet, this.coating)
// });