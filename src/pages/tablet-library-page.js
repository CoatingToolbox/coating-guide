
import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
import { TABLET_LIBRARY } from '../actions/tablet-actions.js';
import { searchIcon, loadIcon, roundTabletIcon, ovalTabletIcon, capletTabletIcon } from '../components/app-icons.js';

import '../components/texts/page-main-title.js';
import '@polymer/paper-input/paper-input.js';

const getLibraryTemplate = (library) => {
  let template = html``;
  library.forEach( item => {
    template = html`
      ${template}
      <div class='cell'>
        <div class='item-title'>${item.productName}</div>
        <div class='subtext'>${item.formulationName}</div>
      </div>
      <div class='cell'>
        <div>${item.companyName}</div>
        <div class='subtext'>${item.contactName}</div>
      </div>
      <div class='cell shape-icon'>
        <div class=''>${getShapeIcon(item.shape)}</div>
        <div class=''>${item.shape}</div>
      </div>
      <div class='cell number'>${getDimensions(item.shape, item.length, item.width)}</div>
      <div class='cell number'>${(item.weight * 1000).toFixed(2)}</div>
      
      <div class='cell'>
        <div class='icon-button' on-click=${ () => loadTablet(item) }>
          ${ loadIcon }
        </div>
      </div> `;
  });
  return template;
};
const filterLibrary = (searchTerm, library) => {
    if(!searchTerm) { return library; }
    return library.filter( 
      tablet => { 
        return (
          tablet.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tablet.productType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tablet.formulationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tablet.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tablet.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tablet.shape.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    );
};
const getShapeIcon = (shape) => {
  switch(shape) {
    case "round":
      return roundTabletIcon;
    case "oval":
      return ovalTabletIcon;
    case "caplet":
      return capletTabletIcon;
    default:
      return '';
  }
};
const getDimensions = (shape, length, width) => {
  switch(shape) {
    case "round":
      return (length * 1000).toFixed(2);
    default:
      return `${ (length * 1000).toFixed(2) } x ${ (width * 1000).toFixed(2) }`;
  }
};
const loadTablet = (tablet) => {
  store.dispatch({
    type: "LOAD_TABLET_FROM_LIBRARY",
    value: tablet,
  });
  window.location = '#tablet';
};

class TabletLibraryPage extends connect(store)(LitElement) {
  static get properties () {
    return {
      filterTerm: String,
      libraryTemplate: String,
    };
  }
  
  _stateChanged(state) {
  
  }
  
  constructor() {
    super();
    this.libraryTemplate = getLibraryTemplate(TABLET_LIBRARY);
  }
  
  
  _render({ libraryTemplate, filterTerm }) {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          padding: 48px 72px;
          background: linear-gradient(to bottom, var(--app-primary-color) 0%,var(--app-primary-color) 320px, var(--background-color) 0%,var(--background-color) 100%);
        }
        #layout {
          max-width: 1024px;
          margin: auto;
        }
        .page-description {
          color: var(--white-color);
          padding-bottom: 32px;
          max-width: 600px;
          margin-right: auto;
        }
        #search-layout {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin: 16px 32px 0px;
          max-width: var(--max-width);
          margin: auto;
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
          grid-template-columns: 2fr 1fr auto auto auto auto;
          grid-template-rows: 48px;
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
        #table .cell:nth-last-child(-n+6) {
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
        #table .shape-icon svg {
          height: 32px;
          width: 32px;
          fill: var(--app-light-color);
          stroke: var(--app-primary-color);
        }
        
        /*Text Fields In Table*/
        #table .header {
          background-color: var(--app-dark-color);
          border-bottom: none;
          color: white;
          padding: 32px 16px;
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
        <page-main-title text="Choose a tablet from the library."></page-main-title>
        <p class='page-description'>
          Don't have tablet details? We have collected a range of pharmacetuical and nutritional tablets that your
          can select to get started faster.
        </p>
        
        <div id='search-layout'>
          ${ searchIcon }
          <paper-input 
            value='${filterTerm}'
            placeholder='Search Tablets...' 
            no-label-float
            on-value-changed='${ (e) => {
              let d = filterLibrary(e.detail.value, TABLET_LIBRARY);
              this.libraryTemplate = getLibraryTemplate(d);
            }}'></paper-input>
        </div>
        
        <div id='table'>
            
            <div class='header cell'>Product</div>
            <div class='header cell'>Company</div>
            <div class='header cell'>Shape</div>
            <div class='header cell'>Dimensions</div>
            <div class='header cell'>Weight</div>
            <div class='header cell'></div>
            
            ${ libraryTemplate } 
            
        </div>
      </div>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-library-page', TabletLibraryPage);