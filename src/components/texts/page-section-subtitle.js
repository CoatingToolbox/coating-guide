
import { LitElement, html } from '@polymer/lit-element';

class PageSectionSubtitle extends LitElement {

  _render () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: flex;
          align-items: center;
          font-size: 18px;
          color: var(--app-primary-color);
          fill: var(--app-primary-color);
        }
        ::slotted(svg) {
          height: 20px;
          width: 20px;
          margin-right: 4px;
        }
      </style>
      
      <slot></slot>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('page-section-subtitle', PageSectionSubtitle);