
import { LitElement, html } from '@polymer/lit-element';

class InputCard extends LitElement {


  _render () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          padding: 16px 0px 0px 0px;
        }
        #layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 12px 32px;
        }
        #layout ::slotted([wide]) {
          grid-column: 1 / 3;
        }
        
        #toolbar {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 56px;
        }
        #toolbar ::slotted([slot='icon']) {
          fill: var(--app-primary-color);
          margin-right: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        #toolbar ::slotted([slot='title']) {
          flex-grow: 1;
          font-size: 18px;
          color: var(--app-primary-color);
        }
      </style>
      
      <div id='toolbar'>
        <slot name='icon'></slot>
        <slot name='title'></slot>
      </div>
      
      <div id='layout'>
        <slot></slot>
      </div>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('input-card', InputCard);