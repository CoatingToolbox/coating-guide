
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/iron-dropdown/iron-dropdown.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/iron-icon/iron-icon.js';
import '../app-icons.js';

class UnitInput extends PolymerElement {
  static get properties () {
    return {
      value: { type: Number, notify: true },
      unit: { type: String, notify: true },
      label: String,
      _units: Array,
      _multiplier: { type: Number, computed: '_computeMultiplier(unit, _units)'}
    };
  }
  
  _computeMultiplier(unit, units) {
    if(!unit || !units) { return 1; }
    let selected = units.filter(item => item.unit == unit);
    if(selected[0]) {
      return selected[0].multiplier || 1;
    } else {
      return 1;
    }
  }
  
  static get observers() {
    return [
      '_setInputValue(_multiplier, value)'
    ];
  }

  _setInputValue(multiplier, value) {
    this.$.input.value = (value / multiplier).toFixed(2);
  }
  
  _unitSelected(e) {
    this.unit = e.model.item.unit;
    this._toggleDropdown();
  }
  
  _toggleDropdown() {
    if(this._units == null) { return; }
    this.$.dropdown.toggle();
  }
  _userInputValue(e) {
    this.value = parseFloat(e.target.value) * this._multiplier;
  }
  
  ironChanged(e) {
    console.log(e);
  }
  
  static get template () {
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
          color: var(--text-light-color);
          font-size: 14px;
          margin-bottom: 4px
        }
        
        #input, 
        #input:focus {
          grid-row: 2 / 3;
          grid-column: 1 / 2;
          background-color: var(--white-color);
          padding: 12px 16px;
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;
          border-radius: 4px 0px 0px 4px;
          border: 1px solid #828282;
          border-right: none;
          outline: none;
          text-align: start;
          text-overflow: ellipsis;
          font-size: 16px;
          color: var(--text-color);
          line-height: 24px;
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
          color: #828282;
          border: 1px solid #828282;
          border-radius: 0px 4px 4px 0px;
          cursor: pointer;
        }
        #icon {
          cursor: pointer;
        }
        
        #dropdown {
          background-color: var(--white-color);
          font-size: 16px;
          color: var(--text-light-color);
          padding: 16px 8px;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12),
                    0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }
        #dropdown .item {
          padding: 8px 16px;
        }
        #dropdown .item + .item {
          margin-top: 4px;
        }
        #dropdown .item:hover {
          cursor: pointer;
          background-color: var(--background-color);
        }
        #dropdown .item.iron-selected {
          color: var(--app-accent-color);
          font-weight: bold;
        }
      </style>
      
      <div id='label'>[[label]]</div>
      <input id='input' type="number" step='0.01' min='0' on-change='_userInputValue' size='1'>
      <div id='unit-layout' on-click='_toggleDropdown'>
        <div>[[unit]]</div>
        <iron-icon id='icon' icon='app-icons:chevron-down'></iron-icon>
      </div>
        
          
      <iron-dropdown id='dropdown' horizontal-align="right" vertical-align="bottom">
        <iron-selector slot='dropdown-content' selected='[[unit]]' attr-for-selected='unit'>
          <template is='dom-repeat' items='[[_units]]'>
              <div class='item' on-tap='_unitSelected' unit='[[item.unit]]'>[[item.text]]</div>
          </template>  
        </iron-selector>
      </iron-dropdown>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('unit-input', UnitInput);

export { UnitInput };
