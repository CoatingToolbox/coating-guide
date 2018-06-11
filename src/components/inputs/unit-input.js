
import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';
import { chevronDownIcon } from '../app-icons.js';

import '@polymer/iron-dropdown/iron-dropdown.js';
import '@polymer/iron-selector/iron-selector.js';

  
  
const getMultiplier = (value, units) => {
  if(!units) { return }
  let mult = 1;
  units.forEach(item => {
    if(item.unit === value) {
      mult = item.multiplier;
    }
  });
  return mult;
};

class UnitInput extends connect(store)(LitElement) {
  static get properties () {
    return {
      unit: String,
      label: String,
      action: String,
      path: String,
      isOpen: String,
      value: Number,
      _units: Array,
      _multiplier: Number,
      _unitsHTML: String
    };
  }
  _firstRendered() {
    
    this._multiplier = getMultiplier(this.unit, this._units);
    
    let options;
    this._units.forEach( (item) => {
      options = html`
        ${options} 
        <div class='item' 
          unit='${item.unit}' 
          mult='${item.multiplier}' 
          on-click=${ (e) => { 
            this._multiplier = item.multiplier;
            this.unit = item.unit;
            this.isOpen = false; 
            this.dispatchEvent(new CustomEvent('unit-changed', {detail: {value: item.unit}}))
          }}>
        ${item.text}
        </div>
      `;
    }) ;
    this._unitsHTML = options;
  }
  _stateChanged(state) {
    let path = this.path.split('.');
    let value = state;
    path.forEach( property => {
      value = value[property];
    });
    if (typeof value === 'number') {
      this.value = value;
    }
  }
  _updateValue(value) {
    value = value * this._multiplier;
    return {
      type: this.action,
      value
    };
  }
  _toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  _render ({value, label, unit, _unitsHTML, _multiplier, isOpen }) {
    return html`
      <style>
        :host {
          display: grid;
          grid-template-rows: auto 1fr;
          grid-template-columns: 1fr auto;
        }
        #label {
          grid-row: 1 / 2;
          grid-column: 1 / 3;
          padding: 0px 4px;
          color: #666666;
          font-size: 14px;
          margin-bottom: 4px
        }
        #input, 
        #input:focus {
          grid-row: 2 / 3;
          grid-column: 1 / 2;
          background-color: var(--white-color);
          padding: 8px 16px;
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;
          border-radius: 4px 0px 0px 4px;
          border: 2px solid #e0e0e0;
          border-right: none;
          outline: none;
          text-align: start;
          text-overflow: ellipsis;
          font-size: 16px;
          color: #666666;
          line-height: 28px;
          align-self: flex-end;
          width: 100%;
        }
        #input[type=number]::-webkit-inner-spin-button,
        #input[type=number]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            -moz-appearance: none;
            margin: 0;
        }
        #input:focus {
          color: var(--app-accent-color);
        }
        #input:hover {
          cursor: text;
        }
        #unit-layout {
          display: flex;
          align-items: center;
          justify-content: center;
          grid-row: 2 / 3;
          grid-column: 2 / 3;
          min-width: 64px;
          padding: 8px 4px 8px 12px;
          background-color: var(--white-color);
          font-size: 14px;
          color: #666666;
          border: 2px solid #e0e0e0;
          border-radius: 0px 4px 4px 0px;
          cursor: pointer;
        }
        #icon {
          display: flex;
          align-items: center;
          justify-content: center;
          grid-row: 2 / 3;
          grid-column: 2 / 3;
          background-color: var(--white-color);
          border-radius: 0px 4px 4px 0px;
          cursor: pointer;
        }
        #icon svg {
          height: 22px;
          width: 22px;
          fill: #666666;
        }
        iron-dropdown {
          max-height: 196px;
          overflow-y: auto;
          background-color: var(--white-color);
          padding: 16px 8px;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12),
                    0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }
        iron-dropdown .item {
          font-size: 14px;
          color: var(--text-light-color);
          padding: 8px 16px;
          min-height: 24px;
        }
        iron-dropdown .item + .item {
          margin-top: 4px;
        }
        iron-dropdown .item:hover {
          cursor: pointer;
          background-color: var(--background-color);
        }
        iron-dropdown .item.iron-selected {
          color: var(--app-accent-color);
          font-weight: bold;
        }
      </style>
      
      <div id='label'>${label}</div>
      
      <input 
        id='input' 
        type="number" 
        step='0.01' 
        min='0' 
        value='${ (value / _multiplier).toFixed(2) }'
        on-change=${ (e) => store.dispatch(this._updateValue(e.target.value)) }
        size='1'>
      
      <div id='unit-layout' 
        on-click=${ () => this._toggleDropdown() }>
        <div>${unit}</div>
        <div id='icon'>${ chevronDownIcon }</div>
      </div>
          
      <iron-dropdown id='dropdown' opened=${isOpen} horizontal-align="right" vertical-align="bottom">
        <iron-selector 
          slot='dropdown-content' 
          selected='${unit}' 
          attr-for-selected='unit'>
          ${ _unitsHTML } 
        </iron-selector>
      </iron-dropdown>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('unit-input', UnitInput);

export { UnitInput };
