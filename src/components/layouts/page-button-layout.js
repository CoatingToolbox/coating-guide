
import { LitElement, html } from '@polymer/lit-element';

class PageButtonLayout extends LitElement {
  
  _render() {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 16px;
          padding: 16px 0px;
        }
      </style>
        
        <slot></slot>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('page-button-layout', PageButtonLayout);