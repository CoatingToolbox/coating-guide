
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
          grid-template-columns: auto auto;
          padding: 24px 72px;
          margin: auto;
          background: linear-gradient(to bottom, var(--app-primary-color) 0%,var(--app-primary-color) 550px, var(--background-color) 0%,var(--background-color) 100%);
          --page-width: 800px;
        }
        #title {
          grid-column: 1 / 2;
          justify-self: end;
          width: 100%;
          max-width:var(--page-width);
          min-height: 64px;
          padding: 32px 0px;
        }
        #title ::slotted(*) {
          color: var(--white-color);
        }
        #page {
          grid-column: 1 / 2;
          grid-row: 2 / 3;
          justify-self: end;
          width: 100%;
          max-width:var(--page-width);
          border-radius: 4px;
        }
        #nav {
          grid-column: 2 / 3;
          grid-row: 2 / 3;
          min-width: 200px;
          padding-left: 32px;
        }
      </style>
      <div id='title'>
        <slot name='title'></slot>
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