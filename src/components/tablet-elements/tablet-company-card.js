import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';
import { productIcon } from '../app-icons.js';

import '../cards/input-card.js';

class TabletCompanyCard extends connect(store)(LitElement) {
  
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
        <div slot='title'>Company Information</div>
        
        <text-input 
          label='Company' 
          value='{{tablet.companyName}}'>
        </text-input>
        
        <text-input 
          label='Location' 
          value='{{tablet.companyLocation}}'>
        </text-input>
        
        <text-input 
          label='Contact' 
          value='{{tablet.contactName}}'>
        </text-input>
        
        <text-input 
          label='Email' 
          value='{{tablet.contactEmail}}'>
        </text-input>
     
     </input-card>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-company-card', TabletCompanyCard);