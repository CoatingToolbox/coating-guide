
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
import '../app-icons.js';

class CardInfoSection extends PolymerElement {
  static get properties () {
    return {
      title: String,
      icon: String
    };
  }

  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: grid;
          grid-template-columns: 1fr 2fr;
          padding: 32px 0px;
        }
        #left-layout {
          grid-row: 1 / 2;
          grid-column: 1 / 2;
        }
        #right-layout {
          grid-row: 1 / 2;
          grid-column: 2 / 3;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 16px;
        }
        #right-layout ::slotted([wide]) {
          grid-column: 1 / 3;
        }
        #title-layout {
          display: flex;
          flex-direction: row;
          align-items: center
        }
        #title-layout #title-icon {
          margin-right: 12px;
          color: var(--app-light-color);
        }
        #title-layout #title {
          font-size: 18px;
          font-weight: ;
          color: var(--app-primary-color);
        }
      </style>
      
      <div id='left-layout'>
        <div id='title-layout'>
          <iron-icon id='title-icon' icon='[[icon]]'></iron-icon>
          <div id='title'>[[title]]</div>
        </div>
      </div>
      
      <div id='right-layout'>
        <slot>
      </div>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('card-info-section', CardInfoSection);