
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
          display: flex;
          align-items: center;
          font-size: 16px;
          height: 32px;
          padding: 0px 8px;
        }
        #label {
        }
      </style>
      
      <div id='label'>[[label]]</div>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('nav-section', NavSection);