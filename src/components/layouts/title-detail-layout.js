
import { LitElement, html } from '@polymer/lit-element';

class TitleDetailLayout extends LitElement {
  
  _render() {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: grid;
          grid-template-columns: 1fr 2fr;
          padding: 32px 0px;
        }
        #title-layout {
          grid-column: 1 / 2;
          align-items: start;
        }
        #title-layout ::slotted(*) {
          padding: 0px;
        }
        #detail-layout {
          grid-column: 2 / 3;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
      </style>
        
      <div id='title-layout'>
        <slot name='title'></slot>
      </div>
    
      <div id='detail-layout'>
        <slot></slot>
      </div>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('title-detail-layout', TitleDetailLayout);