
import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';
import { chevronDownIcon } from '../app-icons.js';

import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/iron-dropdown/iron-dropdown.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/iron-icon/iron-icon.js';

class DropdownInput extends connect(store)(LitElement) {
  static get properties () {
    return {
      label: String,
      options: Array,
      selected: String,
      path: String,
      action: String,
      isOpen: Boolean,
      _optionsHTML: String
    };
  }
  constructor() {
    super();
    this.addEventListener('click', () => {
      this.isOpen = !this.isOpen;
    });
  }
  _firstRendered() {
    let options;
    this.options.forEach( (item) => {
      options = html`
        ${options} 
        <div class='item' option='${item}'>${item}</div>
      `;
    }) ;
    this._optionsHTML = options;
    
  }
  _updateSelected(value) {
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
      this.selected = value;
    }
  }
  
  _render({label, _optionsHTML, selected, isOpen}) {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: auto 1fr;
        }
        #label {
          grid-row: 1 / 2;
          grid-column: 1 / 3;
          padding: 0px 4px;
          color: #666666;
          font-size: 14px;
          margin-bottom: 4px
        }
        #value {
          grid-row: 2 / 3;
          grid-column: 1 / 2;
          background-color: var(--white-color);
          padding: 12px 16px;
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;
          border-radius: 4px 0px 0px 4px;
          border: 2px solid #e0e0e0;
          border-right: none;
          text-align: start;
          text-overflow: ellipsis;
          cursor: pointer;
          font-size: 16px;
          color: var(--text-color);
          line-height: 24px;
        }
        #icon {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 50px;
          width: 50px;
          grid-row: 2 / 3;
          grid-column: 2 / 3;
          background-color: var(--white-color);
          color: #828282;
          border: 2px solid #e0e0e0;
          border-radius: 0px 4px 4px 0px;
          cursor: pointer;
        }
        
        iron-dropdown {
          background-color: var(--white-color);
          font-size: 16px;
          color: var(--text-light-color);
          padding: 16px 8px;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12),
                    0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }
        iron-dropdown .item {
          padding: 8px 16px;
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
      
      <div id='value'>${selected}</div>
      
      <div id='icon'>${ chevronDownIcon }</div>
      
      <iron-dropdown opened=${isOpen} horizontal-align="right" vertical-align="bottom">
        <iron-selector 
          slot='dropdown-content'
          attr-for-selected='option'
          on-selected-changed=${ (e) =>  store.dispatch(this._updateSelected(e.detail.value))}>
          ${_optionsHTML}
        </iron-selector>
      </iron-dropdown>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('dropdown-input', DropdownInput);