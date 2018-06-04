
import { LitElement, html } from '@polymer/lit-element';
import { arrowLeftIcon } from '../app-icons.js';

class LastPageButton extends LitElement {
  static get properties () {
    return {
      page: String
    };
  }
  
  constructor() {
    super();
    this.addEventListener('click', () => { window.location = this.page || '/'});
  }

  _render() {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: grid;
          grid-template-columns: auto 1fr;
          grid-template-rows: auto 1fr;
          align-items: center;
          justify-items: end;
          height: 72px;
          padding: 16px 24px 8px 24px;
          background-color: var(--white-color);
          font-size: 18px;
          color: var(--text-color);
          border-radius: 4px;
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: 0.2s all;
        }
        :host(:hover) {
          color: var(--app-accent-color);
          fill: var(--app-accent-color);
          transition: 0.3s all;
        }
        #label {
          font-size: 14px;
          align-self: start;
        }
        svg {
          grid-row: 1 / 3;
          grid-column: 1 / 2;
          align-self: center;
          justify-self: center;
          fill: var(--text-light-color);
        }
        :host(:hover) svg {
          fill: var(--app-accent-color);
        }
      </style>
      
      <div id='label'>Next Page</div>
      <slot></slot>
      ${ arrowLeftIcon }
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('last-page-button', LastPageButton);