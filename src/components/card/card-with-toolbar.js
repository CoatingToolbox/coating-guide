
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class CardWithToolbar extends PolymerElement {
  static get properties () {
    return {
      title: String,
    };
  }

  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          background-color: var(--white-color);
          padding: 24px 32px 16px 32px;
          width: calc(100% - 64px);
          margin: 0px auto 24px auto;
          border-radius: 4px;
          border: 1px solid var(--border-color);
          
        }
        #toolbar {
          display: flex;
          align-items: start;
          flex-direction: row;
        }
        #title-layout {
          flex-grow: 1;
          flex-direction: column;
          align-items: center;
        }
        #title-layout #card-title {
          font-size: 24px;
        }
        #description ::slotted([slot='card-description']) {
          margin: 0px;
          padding: 0px;
          color: var(--text-light-color);
          font-size: 14px;
          max-width: 85%;
        }
        #content {
          margin-top: 8px;
        }
      </style>
      
      <div id='toolbar'>
        <div id='title-layout'>
          <div id='card-title'>[[title]]</div>
        </div>
        <slot name='toolbar'></slot>
      </div>
      <div id='description'>
        <slot name='card-description'></slot>
      </div>
      
      <div id='content'>
        <slot></slot>
      </div>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('card-with-toolbar', CardWithToolbar);