
import { LitElement, html } from '@polymer/lit-element';

class PageSectionTitle extends LitElement {
  
  _render () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          font-size: 24px;
          color: var(--text-color);
        }
      </style>
      
      <slot></slot>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('page-section-title', PageSectionTitle);