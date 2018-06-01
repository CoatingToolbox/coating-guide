
import { LitElement, html } from '@polymer/lit-element';

class PageMainHeader extends LitElement {
  
  _render() {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          padding-left: 12px;
          border-left: 2px solid var(--app-primary-color);
        }
        
      </style>
    
      <slot></slot>
        
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('page-main-header', PageMainHeader);