
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class TextInput extends PolymerElement {
  static get properties () {
    return {
      label: String,
      value: { type: String, notify: true },
    };
  }
  
  static get template() {
    return html` 
      <style>
    
        :host {
          display: block;
        }
        #label {
          color: var(--text-light-color);
          font-size: 14px;
          margin-bottom: 4px
        }
        #input, 
        #input:focus {
          width: calc(100% - 32px - 2px);
          background-color: var(--white-color);
          padding: 12px 16px;
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;
          border-radius: 4px;
          border: 1px solid #828282;
          outline: none;
          text-align: start;
          text-overflow: ellipsis;
          font-size: 16px;
          color: var(--text-color);
          line-height: 24px;
        }
        
        #input:focus {
          color: var(--app-accent-color);
        }
        #input:hover {
          cursor: text;
        }
      </style>
      
      <div id='label'>[[label]]</div>
      <input
        id='input' 
        type="text" 
        value='{{value::change}}' 
        size='1'
        autocapitalize='words'>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('text-input', TextInput);