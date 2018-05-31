
import { LitElement, html } from '@polymer/lit-element';

class BasicCard extends LitElement {
  
  _render () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          background-color: var(--white-color);
          padding: 8px 24px;
          border-radius: 4px;
          border: 1px solid var(--border-color);
        }
      </style>

      <slot></slot>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('basic-card', BasicCard);