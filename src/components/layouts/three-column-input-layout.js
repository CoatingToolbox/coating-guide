
import { LitElement, html } from '@polymer/lit-element';

class ThreeColumnInputLayout extends LitElement {
  
  _render() {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          padding: 8px 0px;
        }
        #layout {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 16px;
        }
        #layout ::slotted([left]) {
          grid-column: 1 / 2;
        }
        #layout ::slotted([center]) {
          grid-column: 2 / 3;
        }
        #layout ::slotted([right]) {
          grid-column: 3 / 4;
        }
        #layout ::slotted([wide]) {
          grid-column: 1 / 4;
        }
        #layout ::slotted([title]) {
          grid-column: 1 / 4;
          grid-row: 1 / 2;
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
customElements.define('three-column-input-layout', ThreeColumnInputLayout);