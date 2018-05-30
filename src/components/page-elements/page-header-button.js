
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class PageHeaderButton extends PolymerElement {
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
          position: relative;
          padding: 12px 24px;
          border-radius: 6px;
          border: 2px solid var(--border-color);
          color: var(--text-light-color);
          background-color: var(--white-color);
          transition: 0.2s all;
        }
        :host(:hover) {
          color: var(--white-color);
          border-color: var(--app-accent-color);
          background-color: var(--app-accent-color);
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
customElements.define('page-header-button', PageHeaderButton);