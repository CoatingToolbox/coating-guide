
import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

class NumberInput extends connect(store)(LitElement) {
  static get properties () {
    return {
      label: String,
      value: String,
      action: String,
      path: String,
    };
  }
  
  _updateValue(value) {
    return {
      type: this.action,
      value
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
  
  _render({label, value}) {
    return html` 
      <style>
    
        :host {
          display: block;
        }
        #label {
          padding: 0px 4px;
          color: #666666;
          font-size: 14px;
          margin-bottom: 4px;
          
        }
        #input, 
        #input:focus {
          width: calc(100% - 32px - 2px);
          background-color: var(--white-color);
          padding: 8px 16px;
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;
          border-radius: 4px;
          border: 2px solid #e0e0e0;
          outline: none;
          text-align: start;
          text-overflow: ellipsis;
          font-size: 16px;
          color: #666666;
          line-height: 28px;
        }
        
        #input:focus {
          color: var(--app-accent-color);
        }
        #input:hover {
          cursor: text;
        }
      </style>
      
      <div id='label'>${label}</div>
      <input
        id='input' 
        value=${value} 
        on-change=${(e) => store.dispatch(this._updateValue(e.target.value))}
        size='1'
        type='number'
        min='0'
        step='0.01'>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('number-input', NumberInput);