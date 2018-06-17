
import { LitElement, html } from '@polymer/lit-element';

class InputGraphicLayout extends LitElement {
  
  _render() {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          padding: 32px 0px;
          display: grid;
          grid-template-columns: 196px 1fr;
          grid-auto-rows: auto;
          grid-gap: 16px 48px;
        }
        ::slotted(*) {
          grid-column: 1 / 2;
        }
        ::slotted([graphic]) {
          grid-column: 2 / 3;
          grid-row: 1 / 6;
        }
      </style>
        
      <slot></slot>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('input-graphic-layout', InputGraphicLayout);