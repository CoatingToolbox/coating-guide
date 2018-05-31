
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class PageHeader extends PolymerElement {
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
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: auto auto;
          margin: 48px auto;
          padding-left: 12px;
          border-left: 2px solid var(--app-primary-color);
        }
        
        #title {
          grid-row: 1 / 2;
          grid-column: 1 / 2;
        }
        #title ::slotted(*) {
          font-size: 32px;
        }
        
        #descriptions {
          grid-row: 2 / 3;
          grid-column: 1 / 2;
        }
        #description ::slotted(*) {
          margin: 6px 0px 0px 0px;
          font-weight: 14px;
          color: var(--text-light-color);
        }
        
        #buttons {
          grid-row: 1 / 3;
          grid-column: 2 / 3;
        }
        #buttons ::slotted(*) {
          margin: 32px 16px 0px;
        }
      </style>
      
    
        <div id='title'>
          <slot name='title'></slot>
        </div>
        
        <div id='description'>
          <slot name='description'></slot>
        </div>
        <div id='buttons'>
          <slot name='button'></slot>
        </div>
        <slot></slot>
        
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('page-header', PageHeader);