
import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';
import { chevronDownIcon } from '../app-icons.js';

import '@polymer/iron-dropdown/iron-dropdown.js';
import '@polymer/iron-selector/iron-selector.js';

  
class UnitText extends connect(store)(LitElement) {
  static get properties () {
    return {
      unit: String,
      label: String,
      path: String,
      isOpen: String,
      value: Number,
      _units: Array,
      _multiplier: Number,
      _unitsHTML: String
    };
  }
  _firstRendered() {
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
  _toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  _render ({value, label, unit, _unitsHTML, _multiplier, isOpen }) {
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
        #unit-layout {
          display: flex;
          align-items: baseline;
          padding-left: 6px;
          font-size: 14px;
          cursor: pointer;
          color: var(--text-light-color);
        }
        #unit-layout svg {
          align-self: center;
          height: 18px;
          width: 18px;
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
      
      <div id='label'>${label}:</div>
      
      <div id='input'> ${ (value / _multiplier).toFixed(2) } </div>
      
      <div id='unit-layout' 
        on-click=${ () => this._toggleDropdown() }>
        <div>${unit}</div>
        ${ chevronDownIcon }
      </div>
          
      <iron-dropdown id='dropdown' opened=${isOpen} horizontal-align="right" vertical-align="top">
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
customElements.define('unit-text', UnitText);

export { UnitText };
