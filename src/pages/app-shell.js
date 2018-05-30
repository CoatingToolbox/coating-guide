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
import { navigate, updateDrawerState } from '../actions/app-actions.js';
import { menuIcon } from '../components/app-icons.js';

// Element Imports
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/iron-pages/iron-pages.js';
import '@material/mwc-icon';
import '../components/nav-item.js';
import '../components/nav-icon.js';
import '../components/nav-section.js';

class AppShell extends connect(store)(LitElement) {
  _render({_page, _drawerOpened}) {
    // Anything that's related to rendering should be done in here.
    return html`
    <style>
        :host {
          display: block;
        }
        app-header,
        app-toolbar {
          background-color: var(--app-primary-color);
          color: var(--white-color);
        }
        app-header mwc-icon {
          fill: var(--white-color);
          background: none;
          border: none;
          border-radius: 50%;
          padding: 8px;
        }
        app-header mwc-icon:hover {
          background: var(--app-dark-color);
          cursor: pointer;
        }
        app-header #user-name {
          font-size: 16px;
        }
        app-header .icon {
          margin: 8px;
          border-radius: 50%;
          height: 24px;
          width: 24px;
          border: 2px solid var(--white-color);
          background-color: var(--app-dark-color);
        }
      </style>
      <app-drawer-layout fullbleed force-narrow>
        <app-drawer  slot='drawer' opened='${_drawerOpened}'>
          <app-toolbar>Menu</app-toolbar>
          <nav-item link='/overview' label='Overview'></nav-item>
      
          <nav-section label='Materials & Equipment'></nav-section>
          
          <nav-item link='/tablet-overview' label='Tablet' sub-item>
            <nav-icon link='/tablet-designer' icon='app-icons:edit'></nav-icon>
            <nav-icon link='/tablet-library' icon='app-icons:library'></nav-icon>
          </nav-item>
          
          <nav-item link='/pan-overview' label='Pan' sub-item>
            <nav-icon link='/pan-designer' icon='app-icons:edit'></nav-icon>
            <nav-icon link='/pan-library' icon='app-icons:library'></nav-icon>
          </nav-item>
          
          <nav-item link='/coating-overview' label='Coating' sub-item>
            <nav-icon link='/coating-designer' icon='app-icons:edit'></nav-icon>
            <nav-icon link='/coating-library' icon='app-icons:library'></nav-icon>
          </nav-item>
            
          <nav-section label='Trial Setup'></nav-section>
          <nav-item link='/' label='Coating Amount' sub-item></nav-item>
          <nav-item link='/' label='Disperson' sub-item></nav-item>
          <nav-item link='/' label='Batch Size' sub-item></nav-item>
          
          <nav-item link='#/' label='Process Parameters'></nav-item>
       </app-drawer>
        
      <app-header-layout>
      
        <app-header slot='header' fixed effects='waterfall'>
          <app-toolbar>
            <mwc-icon on-click='${_ => store.dispatch(updateDrawerState(true))}'>${menuIcon}</mwc-icon>
            <div main-title>Colorcon Coating Guide</div>
            <div class='icon'></div>
            <div id='user-name'>[[user.email]]</div>
          </app-toolbar>
        </app-header>
      
        <iron-pages  selected='${_page}' attr-for-selected='page' fallback-selection='overview'>
        
          <overview-page page='overview'></overview-page>
          
          <tablet-overview-page page='tablet-overview'></tablet-overview-page>
          <tablet-library-page page='tablet-library'></tablet-library-page>
          <tablet-designer-page page='tablet-designer'></tablet-designer-page>
          
          <pan-overview-page page='pan-overview'></pan-overview-page>
          <pan-library-page page='pan-library'></pan-library-page>
          <pan-designer-page page='pan-designer'></pan-designer-page>
          
          <coating-overview-page page='coating-overview'></coating-overview-page>
          <coating-library-page page='coating-library'></coating-library-page>
          <coating-designer-page page='coating-designer'></coating-designer-page>
          
          <page-404 page='404'></page-404>
        </iron-pages>
        
      </app-header-layout>
    </app-drawer-layout>
    `;
  }

  static get properties() {
    return {
      _page: String,
      _offline: Boolean
    };
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/2.0/docs/devguide/gesture-events#use-passive-gesture-listeners
    setPassiveTouchGestures(true);
  }

  _firstRendered() {
    installRouter((location) => store.dispatch(navigate(window.decodeURIComponent(location.pathname))));
  }

  _stateChanged(state) {
    this._page = state.app.page;
    this._drawerOpened = state.app.drawerOpened;
  }
}

window.customElements.define('app-shell', AppShell);