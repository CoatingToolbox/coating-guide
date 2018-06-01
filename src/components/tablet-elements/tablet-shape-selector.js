import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';
import { roundTabletIcon, ovalTabletIcon, capletTabletIcon } from '../app-icons.js';

import '@polymer/iron-selector/iron-selector.js';

class TabletShapeSelector extends connect(store)(LitElement) {
  
  static get properties() {
    return {
      _shape: String,
    };
  }
  _updateShape(value) {
    return {
      type: "SET_TABLET_SHAPE",
      value
    };
  }
  
  _stateChanged(state) {
    this._shape = state.tablet.shape;
  }
  _render ({_shape}) {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
        }
        #shape-selector {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin: 24px auto 48px auto;
          
        }
        #shape-selector [shape] {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: var(--background-color);
          border: 3px solid var(--border-color);
          border-radius: 12px;
          color: var(--text-light-color);
          font-size: 14px;
          padding: 16px 24px;
          transition: all 0.2s;
        }
        #shape-selector svg {
          width: 124px;
          height: 124px;
          fill: var(--border-color);
          stroke: var(--border-color);
          fill-opacity: 0.4;
          stroke-width: 0.75px;
          transition: all 0.2s;
        }
        #shape-selector .iron-selected {
          color: var(--app-primary-color);
          background-color: var(--white-color);
          transition: all 0.2s;
        }
        #shape-selector .iron-selected svg {
          fill: var(--app-primary-color);
          stroke: var(--app-primary-color);
          transition: all 0.2s;
        }
      </style>
      
      <iron-selector id='shape-selector' 
        selected='${_shape}' attr-for-selected='shape'
        on-selected-changed=${ (e) => store.dispatch(this._updateShape(e.detail.value))}>
     
      <div shape='round'>
        ${ roundTabletIcon }
        <div>Round</div>
      </div>
      
      <div shape='oval'>
        ${ ovalTabletIcon }
        <div>Oval</div>
      </div>
      
      <div shape='caplet'>
        ${ capletTabletIcon }
        <div>Caplet</div>
      </div>
      
      </iron-selector>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-shape-selector', TabletShapeSelector);