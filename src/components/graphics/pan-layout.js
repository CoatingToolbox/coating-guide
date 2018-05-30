
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './pan-graphic.js';

class PanLayout extends PolymerElement {
  static get properties () {
    return {
      pan: Object,
    };
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
          .schematic-label {
            color: var(--text-light-color);
            text-align: center;
          }
          
          [hidden] {
            display: none;
          }  
        </style>
        
        <div class='graphic-layout'>
          <pan-graphic front-view pan='[[pan]]'></pan-graphic>
          <div class='schematic-label'>Front View</div>
        </div>
        
        <div class='graphic-layout'>
          <pan-graphic side-view pan='[[pan]]'></pan-graphic>
          <div class='schematic-label'>Side View</div>
        </div>  
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('pan-layout', PanLayout);