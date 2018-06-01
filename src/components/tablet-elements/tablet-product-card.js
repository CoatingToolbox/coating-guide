import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';
import { productIcon } from '../app-icons.js';

import '@polymer/iron-selector/iron-selector.js';
import '@material/mwc-icon';
import '../cards/input-card.js';
import '../inputs/text-input.js';
import '../inputs/dropdown-input.js';

class TabletProductCard extends connect(store)(LitElement) {
  
  static get properties () {
    return {
      
  }
  
  _stateChanged(state) {
    
  }
  
  _render () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <input-card>
        
          <div slot='icon'>${ productIcon }</div>
          <div slot='title'>Product Information</div>
          
          <text-input 
            wide 
            label='Name' 
            value='{{tablet.productName}}'>
          </text-input>
          
          <text-input 
            label='Active Ingredient' 
            value='{{tablet.activeName}}'>
          </text-input>
          
          <text-input 
            label='Formulation' 
            value='{{tablet.formulationName}}'>
          </text-input>
        
          <dropdown-input 
            label='Dosage Form' 
            selected='{{tablet.dosageForm}}' 
            options='[[dosageOptions]]'>
          </dropdown-input>
          
          <dropdown-input 
            label='Market' 
            selected='{{tablet.productType}}' 
            options='[[marketOptions]]'>
          </dropdown-input>
        
        </input-card>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-product-card', TabletProductCard);