import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';
import { rulerIcon } from '..//app-icons.js';
import '../inputs/length-input.js';
import '../cards/input-card.js';

class TabletDimensionsPage extends connect(store)(LitElement) {
  
  
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
        [hidden] {
          display: none;
        }
      </style>
      
      
        
        <input-card>
       
          <div slot='icon'>${ rulerIcon }</div>
          <div slot='title'>Tablet Dimensions</div>
            
            <length-input 
              label='Length' 
              value='{{tablet.length}}' 
              unit='{{dimensionUnits}}'>
            </length-input>
            
            <length-input 
              hidden$='{{isRound}}' 
              label='Width' 
              value='{{tablet.width}}' 
              unit='{{dimensionUnits}}'>
            </length-input>
            
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
          
          </input-card>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-dimensions-card', TabletDimensionsPage);