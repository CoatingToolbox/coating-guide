
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class NavItem extends PolymerElement {
  static get properties () {
    return {
      link: String,
      label: String,
      subItem: { type: Boolean, reflectToAttribute: true }
    };
  }
  _gotoLink() {
      window.location = this.link;
  }
  static get template () {
    return html`
      <style>
        :host {
          display: flex;
          padding: 0px 0px 0px 16px;
          font-size: 16px;
          cursor: pointer;
        }
        :host([sub-item]) {
          margin-left: 16px;
          color: var(--text-light-color);
        }
        :host(:hover) {
          background-color: var(--light-gray-color);
        }
        #label {
          flex-grow: 1;
          padding: 8px 0px;
        }
        #button-layout {
          display: flex;
          opacity: 0;
          transition: opacity: 0.1s;
        }
        :host(:hover) #button-layout {
          opacity: 1;
          transition: opacity: 0.1s;
        }
        
      </style>
      
      <div id='label' on-click='_gotoLink'>[[label]]</div>
      <div id='button-layout'>
        <slot></slot>
      </div>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('nav-item', NavItem);