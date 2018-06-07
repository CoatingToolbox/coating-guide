
import { LitElement, html } from '@polymer/lit-element';
import { store } from '../store.js';
import { COATING_LIBRARY } from '../actions/coating-actions.js';
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
        <div class='item-title'>${item.productName}</div>
    </div>
      <div class='cell'>
        <div class='item-title'>${item.formulaName}</div>
    </div>
    <div class='cell'>
        <div class='subtext'>${item.color}</div>
    </div>
    <div class='cell'>
        <div>${item.releaseType}</div>
    </div>
    <div class='cell number'>${(item.solids * 100).toFixed(1)}%</div>
    <div class='cell number'>${(item.filmDensity / 1000000 ).toFixed(2)} g/ml</div>
    <div class='cell number'>${(item.filmOpacity * 100).toFixed(0)}%</div>
    
    <div class='cell'>
        <div class='icon-button' on-click=${ ()=> loadCoating(item) }> ${ loadIcon }
        </div>
    </div>
      `;
  });
  return template;
};
const filterLibrary = (searchTerm, library) => {
    if(!searchTerm) { return library; }
    return library.filter( 
      coat => { 
        return (
          coat.formulaName.toLowerCase().includes(searchTerm.toLowerCase()) || 
             coat.color.toLowerCase().includes(searchTerm.toLowerCase()) || 
              coat.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
              coat.releaseType.toLowerCase().includes(searchTerm.toLowerCase()) 
        );
      }
      );
};
const loadCoating = (coating) => {
  store.dispatch({
    type: "LOAD_COATING_FROM_LIBRARY",
    value: coating,
  });
  window.location = '#coating';
};


class CoatingLibraryPage extends LitElement {
  static get properties () {
    return {
      filterTerm: String,
      libraryTemplate: Array
    };
  }
  constructor() {
    super();
    this.libraryTemplate = getLibraryTemplate(COATING_LIBRARY);
  }
  
  _render({ libraryTemplate }) {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        
        :host {
          display: block;
          padding: 48px 72px;
          background: linear-gradient(to bottom, var(--app-primary-color) 0%,var(--app-primary-color) 288px, var(--background-color) 0%,var(--background-color) 100%);
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
          grid-template-columns: auto auto auto auto auto auto auto auto;
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
        #table .cell:nth-last-child(-n+8) {
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
          Don't have tablet details? Choose a tablet from the library. We have collected a range of pharmacetuical and nutritional tablets that your
          can select to get started faster.
        </page-description>
      
        <div id='search-layout'>
          ${ searchIcon }
          <paper-input 
            placeholder='Search Tablets...' 
            no-label-float
            on-value-changed='${ (e) => {
              let d = filterLibrary(e.detail.value, COATING_LIBRARY);
              this.libraryTemplate = getLibraryTemplate(d);
            }}'></paper-input>
        </div>
        
      
      <div id='table'>
        <div class='header cell'>Product</div>
        <div class='header cell'>Formula</div>
        <div class='header cell'>Color</div>
        <div class='header cell'>Releae Type</div>
        <div class='header cell'>Solids</div>
        <div class='header cell'>Film Density</div>
        <div class='header cell'>Opacity</div>
        <div class='header cell'></div>
        
        ${ libraryTemplate }
        
      </div>   
      
    </div>  
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('coating-library-page', CoatingLibraryPage);