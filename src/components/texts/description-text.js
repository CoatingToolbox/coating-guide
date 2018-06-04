
import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

  
class DescriptionText extends connect(store)(LitElement) {
  static get properties () {
    return {
      label: String,
      path: String,
      value: Number,
    };
  }
  _stateChanged(state) {
    let path = this.path.split('.');
    let value = state;
    path.forEach( property => {
      value = value[property];
    });
    if (typeof value === 'string') {
      this.value = value;
    }
  }
  _render ({value, label, isOpen }) {
    return html`
      <style>
        :host {
          display: flex;
          align-items: baseline;
          font-size: 14px;
          color: var(--text-color);
          padding: 8px 0px;
          justify-self: start;
        }
        #dot {
          background-color: var(--app-light-color);
          border-radius: 50%;
          height: 10px;
          width: 10px;
          margin-right: 8px;
          align-self: center;
        }
        #label {
          font-weight: bold;
          padding-right: 16px;
        }
        #input {
          text-overflow: ellipsis;
          color: var(--text-light-color);
        }
      </style>
      
      <div id='label'>${label}:</div>
      
      <div id='input'> ${ value } </div>
      
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('description-text', DescriptionText);

