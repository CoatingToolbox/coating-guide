
import { LitElement, html } from '@polymer/lit-element';

class LargeButton extends LitElement {
  

  _render({label}) {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          padding: 6px 24px;
          border-radius: 24px;
          border: var(--border-line);
          background-color: var(--background-color);
          color: var(--text-light-color);
          cursor: pointer;
          font-size: 14px;
          transition: 0.2s all;
        }
        :host(:hover),
        :host([highlight]) {
          transition: 0.3s all;
          border-color: var(--app-accent-color);
          background-color: var(--app-accent-color);
          color: var(--white-color);
        }
        :host(:hover) {
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                    0 1px 5px 0 rgba(0, 0, 0, 0.12),
                    0 3px 1px -2px rgba(0, 0, 0, 0.2);
        }
      </style>
      
      <slot></slot>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('large-button', LargeButton);