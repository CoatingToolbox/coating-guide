import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';
import { rulerIcon } from '..//app-icons.js';
import '../inputs/length-input.js';
import '../texts/input-title.js';
import './tablet-graphic.js';

class TabletThicknessPage extends connect(store)(LitElement) {
  
  
  _stateChanged(state) {
    
  }
  _render () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 16px 32px;
        }
        input-title {
          grid-column: 1 / 3;
          grid-row: 1 / 2;
        }
        tablet-graphic {
          grid-column: 2 / 3;
          grid-row: 2 / 4;
        }
      </style>
        
      <input-title label='Tablet Thickness'></input-title>
            
      <length-input 
        label='Total Thickness' 
        value='{{tablet.totalThickness}}' 
        unit='{{dimensionUnits}}'>
      </length-input>
      
      <length-input 
        label='Band Thickness' 
        value='{{tablet.bandThickness}}' 
        unit='{{dimensionUnits}}'>
      </length-input>
      
      <tablet-graphic view='length'></tablet-graphic>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-thickness-card', TabletThicknessPage);