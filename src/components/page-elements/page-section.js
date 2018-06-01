
import { LitElement, html } from '@polymer/lit-element';

class PageSection extends LitElement {

  _render() {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          margin: 56px 0px 0px 0px;
        }
        
        #title ::slotted(*) {
          font-size: 24px;
        }
        
        #description ::slotted(*) {
          margin: 6px 0px 0px 0px;
          font-size: 14px;
          color: var(--text-light-color);
        }
        
      </style>
      
        <div id='title'>
          <slot name='title'></slot>
        </div>
        
        <div id='description'>
          <slot name='description'></slot>
        </div>
        
        <slot></slot>
        
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('page-section', PageSection);