
import { LitElement, html } from '@polymer/lit-element';
import { store } from '../store.js';
import { PAN_LIBRARY } from '../actions/pan-actions.js';
import { searchIcon, loadIcon } from '../components/app-icons.js';

import '../components/texts/page-main-title.js';
import '../components/texts/page-description.js';
import '@polymer/paper-input/paper-input.js';

const getLibraryTemplate = (library) => {
  let template = html``;
  library.forEach( item => {
    template = html`
      ${template}
      <div class='cell'>
          <div class='item-title'>${ item.nickname }</div>
      </div>
      <div class='cell'>
          <div class='item-title'>${ item.modelName }</div>
          <div class='subtext'>${ item.manufacturerName }</div>
      </div>
      <div class='cell'>
          <div>${ item.companyName }</div>
          <div class='subtext'>${ item.companyLocation }</div>
      </div>
      <div class='cell number'>${ (item.mainDiameter * 39.3701).toFixed(1) } </div>
      <div class='cell number'>${ (item.brimVolume * 1000).toFixed(1) } </div>
      <div class='cell number'>${ (item.minFillVolume * 1000).toFixed(1) } to ${ (item.maxFillVolume * 1000).toFixed(1) }</div>
      
      <div class='cell'>
          <div class='icon-button' on-click=${ ()=> loadPan(item) }> ${ loadIcon }
          </div>
      </div>
 
      `;
  });
  return template;
};
const filterLibrary = (searchTerm, library) => {
    if(!searchTerm) { return library; }
    return library.filter( 
      pan => { 
        return (
          pan.manufacturerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
              pan.modelName.toLowerCase().includes(searchTerm.toLowerCase()) || 
              pan.nickname.toLowerCase().includes(searchTerm.toLowerCase()) || 
              pan.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
              pan.locationName.toLowerCase().includes(searchTerm.toLowerCase()) 
        );
      }
      );
};
const loadPan = (pan) => {
  store.dispatch({
    type: "LOAD_PAN_FROM_LIBRARY",
    value: pan,
  });
  window.location = '#pan';
};


class PanLibraryPage extends LitElement {
  static get properties () {
    return {
      filterTerm: String,
      libraryTemplate: String,
    };
  }
  
  _firstRendered() {
    this.libraryTemplate = getLibraryTemplate(PAN_LIBRARY);
  }
  
  _render({ libraryTemplate }) {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          padding: 48px 72px;
          background: linear-gradient(to bottom, var(--app-primary-color) 0%,var(--app-primary-color) 265px, var(--background-color) 0%,var(--background-color) 100%);
        }     
        #layout {
          max-width: 1024px;
          margin: auto;
        }
        
        #search-layout {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin: 32px auto 0px;
        }
        #search-layout svg {
          fill: var(--white-color);
          margin-right: 8px;
        }
        #search-layout paper-input {
          color: var(--white-color);
          --paper-input-container-input-color: var(--white-color);
          --paper-input-container-color: var(--white-color);
          --paper-input-container-focus-color: var(--white-color);
        } 
        
        /*Styles for Table and Cells*/
        #table {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr auto auto auto auto;
          grid-auto-rows: auto;
          background-color: var(--white-color);
          border-radius: 6px;
        }
        #table .cell {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 24px 16px;
          border-bottom: 1px solid var(--border-color);
        }
        
        #table .cell:nth-last-child(-n+7) {
          border-bottom: none;
        }
        
        /*Styles for buttons in table*/
        
        #table .icon-button {
          display: flex;
          align-items: center;
          justify-content: center;
          align-self: center;
          padding: 4px;
          border-radius: 50%;
          fill: #bdbdc3;
          background-color: var(--background-color);
          border: 2px solid #bdbdc3;
          transition: all 0.2s;
        }
        #table .icon-button:hover {
          cursor: pointer;
          fill: var(--app-accent-color);
          border: 2px solid var(--app-accent-color);
          transition: all 0.2s;
        }
        #table .icon-button svg {
          width: 20px;
          height: 20px;
        }
        
        
        /*Styles for shape icon in table*/
        #table .shape-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-transform: capitalize;
        }
        #table .shape-icon iron-icon {
          height: 32px;
          width: 32px;
          color: var(--app-light-color);
          --iron-icon-stroke-color: var(--app-light-color);
        }
        
        /*Text Fields In Table*/
        #table .header {
          background-color: var(--app-dark-color);
          border-bottom: none;
          color: white;
          padding: 20px 16px;
        }
        #table .subtext {
          color: var(--text-light-color);
          font-size: 14px;
        }
        #table .number {
          text-align: center;
        }
      </style>
      
      <div id='layout'>
      
        <page-main-title>Coating Pan Library</page-main-title>
        <page-description>
          Choose a coating pan from Colorcon's library.
        </page-description>
        <div id='search-layout'>
          ${ searchIcon }
          <paper-input 
            placeholder='Search Pans...' 
            no-label-float
            on-value-changed='${ (e) => {
              let d = filterLibrary(e.detail.value, PAN_LIBRARY);
              this.libraryTemplate = getLibraryTemplate(d);
            }}'></paper-input>
        </div>
        <div id='table'>
          <div class='header cell'>Name</div>
          <div class='header cell'>Equipment</div>
          <div class='header cell'>Location</div>
          <div class='header cell'>Diameter</div>
          <div class='header cell'>Brim Volume</div>
          <div class='header cell'>Working Volume</div>
          <div class='header cell'></div>
          
          ${ libraryTemplate }
          
        </div>
      </div>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('pan-library-page', PanLibraryPage);