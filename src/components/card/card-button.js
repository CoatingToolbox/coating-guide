
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class CardButton extends PolymerElement {
  static get properties () {
    return {
      label: String
    };
  }

  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          padding: 6px 24px;
          border-radius: 24px;
          border: var(--border-line);
          background-color: var(--background-color);
          color: var(--text-light-color);
          cursor: pointer;
          transition: 0.2s all;
        }
        :host(:hover) {
          border-color: var(--app-accent-color);
          background-color: var(--app-accent-color);
          color: var(--white-color);
          transition: 0.3s all;
        }
        #label {
          font-size: 14px;
        }
      </style>
      
      <div id='label'>[[label]]</div>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('card-button', CardButton);