
import { LitElement, html } from '@polymer/lit-element';

class PageDescription extends LitElement {

  _render () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          font-size: 16px;
          color: var(--white-color);
          max-width: 700px;
          margin-right: auto;
          padding: 16px 0px;
        }
      </style>
      
      <slot></slot>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('page-description', PageDescription);