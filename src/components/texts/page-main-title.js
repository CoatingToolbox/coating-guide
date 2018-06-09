
import { LitElement, html } from '@polymer/lit-element';

class PageMainTitle extends LitElement {

  _render () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          font-size: 48px;
          font-weight: 300;
          color: var(--white-color);
        }
      </style>
      
      <slot></slot>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('page-main-title', PageMainTitle);