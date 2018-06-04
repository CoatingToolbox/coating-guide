
import { LitElement, html } from '@polymer/lit-element';

class PageMainTitle extends LitElement {

  static get properties() {
    return {
      text: String,
    };
  }
  _render ({text}) {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          font-size: 36px;
          color: var(--text-color);
        }
      </style>
      
      <div>${text}</div>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('page-main-title', PageMainTitle);