
import { LitElement, html } from '@polymer/lit-element';

class PageSectionSubtitle extends LitElement {

  static get properties() {
    return {
      text: String,
      icon: String
    };
  }
  _render ({text, icon}) {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: flex;
          align-items: center;
          padding-top: 24px;
          font-size: 18px;
          color: var(--app-primary-color);
          fill: var(--app-primary-color);
        }
        svg {
          height: 20px;
          width: 20px;
        }
        div {
          margin-left: 4px;
        }
      </style>
      
      ${ icon }
      <div>${text}</div>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('page-section-subtitle', PageSectionSubtitle);