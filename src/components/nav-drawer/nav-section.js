
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class NavSection extends PolymerElement {
  static get properties () {
    return {
      label: String,
    };
  }

  static get template () {
    return html`
      <style>
        
        :host {
          display: block;
          padding: 0px 0px 0px 16px;
          font-size: 16px;
        }
        #label {
          padding: 8px 0px;
        }
      </style>
      
      <div id='label'>[[label]]</div>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('nav-section', NavSection);