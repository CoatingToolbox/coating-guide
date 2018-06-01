/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from '@polymer/lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installRouter } from 'pwa-helpers/router.js';
import { store } from '../store.js';
import { navigate } from '../actions/app-actions.js';
import { appIcon } from '../components/app-icons.js';

// Element Imports
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/iron-pages/iron-pages.js';

class AppShell extends connect(store)(LitElement) {
  _render({_page}) {
    // Anything that's related to rendering should be done in here.
    return html`
    <style>
        :host {
          display: block;
        }
        app-header {
          color: var(--text-color);
          background-color: var(--white-color);
        }
        app-header #icon {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 8px;
        }
        app-header #user-name {
          font-size: 12px;
          color: var(--text-light-color)
        }
        app-header .icon {
          display: flex;
          align-items: center;
          font-size: 12px;
          font-weight: bold;
          justify-content: center;
          margin: 8px;
          border-radius: 50%;
          height: 24px;
          width: 24px;
          border: 2px solid var(--app-dark-color);
          background-color: var(--background-color);
          color: var(--app-dark-color)
        }
      </style>
      
        
      <app-header-layout fullbleed>
      
        <app-header slot='header' fixed effects='waterfall'>
          <app-toolbar>
            <div id='icon'>${appIcon}</div>
            <div main-title>Colorcon Coating Guide</div>
            <div class='icon'>J</div>
            <div id='user-name'>Jason Hansell</div>
          </app-toolbar>
        </app-header>
        
        <iron-pages  selected='${_page}' attr-for-selected='page' fallback-selection='overview'>
        
          <overview-page page='overview'></overview-page>
          
          <tablet-library-page page='tablet-library'></tablet-library-page>
          <tablet-page page='tablet'></tablet-page>
          
          <pan-overview-page page='pan-overview'></pan-overview-page>
          <pan-library-page page='pan-library'></pan-library-page>
          <pan-designer-page page='pan-designer'></pan-designer-page>
          
          <coating-overview-page page='coating-overview'></coating-overview-page>
          <coating-library-page page='coating-library'></coating-library-page>
          <coating-designer-page page='coating-designer'></coating-designer-page>
          
          <page-404 page='404'></page-404>
        </iron-pages>
      </app-header-layout>
    `;
  }

  static get properties() {
    return {
      _page: String
    };
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/2.0/docs/devguide/gesture-events#use-passive-gesture-listeners
    setPassiveTouchGestures(true);
  }

  _firstRendered() {
    installRouter((location) => store.dispatch(navigate(window.decodeURIComponent(location.hash))));
  }

  _stateChanged(state) {
    this._page = state.app.page;
  }
}

window.customElements.define('app-shell', AppShell);