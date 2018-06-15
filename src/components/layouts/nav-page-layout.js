
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
          grid-template-columns: 1fr;
          padding: 24px 72px;
          margin: auto;
          background: linear-gradient(to bottom, var(--app-primary-color) 0%,var(--app-primary-color) 528px, var(--background-color) 0%,var(--background-color) 100%);
          --page-width: 800px;
        }
        #title, 
        #page {
          max-width: var(--page-width);
          width: 100%;
          justify-self: center;
        }
        #title {
          grid-column: 1 / 2;
          padding: 48px 0px;
        }
        #title ::slotted(*) {
          color: var(--white-color);
        }
        #page {
          grid-column: 1 / 2;
          grid-row: 2 / 3;
        }
        #nav {
          display: none;
        }
        @media(min-width: 1200px) {
          :host {
            grid-template-columns: auto auto;
          }
          #title, 
          #page {
            max-width: var(--page-width);
            width: 100%;
            justify-self: center;
          }
          #nav {
            display: block;
            grid-column: 2 / 3;
            grid-row: 2 / 3;
            min-width: 200px;
            padding-left: 8px;
          }
          
          
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