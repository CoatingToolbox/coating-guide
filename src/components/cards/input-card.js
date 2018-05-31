
import { LitElement, html } from '@polymer/lit-element';

class InputCard extends LitElement {


  _render () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          background-color: var(--white-color);
          padding: 8px 24px 24px 24px;
          border-radius: 4px;
          border: 1px solid var(--border-color);
        }
        #layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 24px;
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