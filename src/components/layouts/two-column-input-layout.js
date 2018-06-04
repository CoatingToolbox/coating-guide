
import { LitElement, html } from '@polymer/lit-element';

class TwoColumnInputLayout extends LitElement {
  
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
          grid-template-columns: 1fr 1fr;
          grid-gap: 16px;
        }
        #layout ::slotted([left]) {
          grid-column: 1 / 2;
        }
        #layout ::slotted([right]) {
          grid-column: 2 / 3;
        }
        #layout ::slotted([wide]) {
          grid-column: 1 / 3;
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
customElements.define('two-column-input-layout', TwoColumnInputLayout);