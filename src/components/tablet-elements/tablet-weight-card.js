import { LitElement, html } from '@polymer/lit-element';

import '../inputs/density-input.js';
// import './bulk-density-chart.js';

class TabletWeightCard extends LitElement {
  
  
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
      
      
        <card-with-toolbar title='Tablet Weight & Density'>
          <p slot='card-description'>
            Provide additional details on the tablet weight.
          </p>
        
          <card-info-section title='Tablet Weight' icon='app-icons:weight'>
            <mass-input 
              label='Tablet Weight' 
              value='{{tablet.weight}}' 
              unit='mg'>
            </mass-input>
          </card-info-section>
          
          <card-info-section title='Bulk Density' icon='app-icons:density'>
            <density-input
              label='Bulk Density' 
              value='{{tablet.bulkDensity}}' 
              unit='g/ml'>
            </density-input>
            
            <bulk-density-chart id='chart' wide bulk-density='[[tablet.bulkDensity]]'></bulk-density-chart>
          </card-info-section>
          
        </card-with-toolbar>
      
      </page-layout>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-weight-card', TabletWeightCard);