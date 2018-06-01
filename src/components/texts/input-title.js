
import { LitElement, html } from '@polymer/lit-element';

class InputTitle extends LitElement {

  static get properties() {
    return {
      label: String,
      icon: String
    };
  }

  _render ({label, icon}) {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top: 16px;
        }
        svg {
          fill: var(--app-primary-color);
          margin-right: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        #title {
          flex-grow: 1;
          font-size: 18px;
          color: var(--app-primary-color);
        }
      </style>
      
        ${ icon }
        <div id='title'>${label}</div>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('input-title', InputTitle);