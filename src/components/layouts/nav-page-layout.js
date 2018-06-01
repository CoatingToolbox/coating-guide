
import { LitElement, html } from '@polymer/lit-element';
import '../nav-drawer/nav-drawer.js';
class NavPageLayout extends LitElement {
  
  static get properties() {
    return {
      page: String
    };
  }
  _render({page}) {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: grid;
          grid-template-columns: auto 1fr;
          padding: 0px 56px 24px 48px;
          grid-gap: 0px 48px;
          margin: auto;
          background: linear-gradient(to bottom, var(--app-primary-color) 0%,var(--app-primary-color) 432px, #000000 432px,var(--background-color) 0%,var(--background-color) 100%);
        }
        #toolbar {
          grid-column: 1 / 3;
          display: flex;
          align-items: center;
          height: 64px;
          font-size: 20px;
          color: var(--white-color);
        }
        #page {
          background-color: var(--white-color);
          max-width: 800px;
          padding: 24px 32px;
          border-radius: 4px;
        }
      </style>
      <div id='toolbar'>
        <div>${page}</div>
      </div>
      <div id='page'>
        <slot></slot>
      </div>
      <div id='nav'>
        <nav-drawer></nav-drawer>
      </div>
        
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('nav-page-layout', NavPageLayout);