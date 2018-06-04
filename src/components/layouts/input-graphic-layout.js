
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
        }
        #layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          grid-auto-rows: auto;
          grid-gap: 16px 48px;
        }
        #layout ::slotted(*) {
          grid-column: 1 / 2;
        }
        #layout ::slotted([title]) {
          grid-row: 1 / 2;
          grid-column: 1 / 3;
        }
        #layout ::slotted([wide]) {
          grid-column: 1 / 3;
        }
        #layout ::slotted([graphic]) {
          grid-column: 2 / 3;
          grid-row: 2 / 6;
        }
      </style>
        
      <div id='layout'>
        <slot></slot>
      </div>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('input-graphic-layout', InputGraphicLayout);