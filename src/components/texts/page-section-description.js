
import { LitElement, html } from '@polymer/lit-element';

class PageSectionDescription extends LitElement {
  
  _render () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          font-size: 16px;
          color: var(--text-color);
          max-width: 600px;
          margin: 8px auto 16px 0px;
        }
      </style>
      
      <slot></slot>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('page-section-description', PageSectionDescription);