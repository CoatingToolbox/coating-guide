
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class CardInfoItem extends PolymerElement {
  static get properties () {
    return {
      label: String,
      capitalize: { type: Boolean, reflectToAttribute: true}
    };
  }

  static get template () {
    return html`
      <style>
        :host {
          display: flex;
          flex-direction: row;
          align-items: baseline;
          font-size: 14px;
        }
        :host([capitalize]) {
          text-transform: capitalize;
        }
        #label {
          font-weight: bold;
          margin-right: 8px;
        }
      </style>
      
      <div id='label'>[[label]]:</div>
      <slot></slot>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('card-info-item', CardInfoItem);