
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './tablet-graphic.js';

class TabletLayout extends PolymerElement {
  static get properties () {
    return {
      tablet: Object,
      noWidthView: Boolean,
      isRound: {type: Boolean, computed: '_computeIsRound(tablet.shape)'}
    };
  }
  
  _computeIsRound(shape) {
    return shape === 'round';
  }
  
  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        /*Schematic Styles*/
        :host {
          display: flex;
          width: calc(100% - 32px - 10px);
          align-items: center;
          justify-content: space-around;
          border-radius: 16px;
          background-color: var(--background-color);
          border: 5px solid var(--border-color);
          padding: 8px 16px 16px 16px;
        }
        .graphic-layout {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        tablet-graphic {
          width: 175px;
          height: 175px;
        }
        .schematic-label {
          color: var(--text-light-color);
          text-align: center;
        }
        
        [hidden] {
          display: none;
        }  
      </style>
      
      <div class='graphic-layout'>
        <tablet-graphic top-view tablet='[[tablet]]'></tablet-graphic>
        <div class='schematic-label'>Top View</div>
      </div>
      
      <div class='graphic-layout'>
        <tablet-graphic length-view tablet='[[tablet]]'></tablet-graphic>
        <div class='schematic-label'>Length View</div>
      </div>
      
      <div class='graphic-layout' hidden$='[[isRound]]'>
        <tablet-graphic width-view tablet='[[tablet]]'></tablet-graphic>
        <div class='schematic-label'>Width View</div>
      </div>        
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-layout', TabletLayout);