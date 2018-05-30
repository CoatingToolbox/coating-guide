
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { ReduxMixin } from '../redux-mixin.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '../components/page-elements/page-layout.js';
import '../components/page-elements/page-header.js';
import '../components/app-icons.js';

class TabletLibraryPage extends ReduxMixin(PolymerElement) {
  static get properties () {
    return {
      filterTerm: String,
      firebaseLibrary: Array
    };
  }
  
  ready() {
    super.ready();
    
    firebase.database().ref('tablets/').on('value', snapshot => {
      let library = [];
      snapshot.forEach(child => {
        library.push(child.val());
      });
      this.firebaseLibrary = library;
    });
  }
  
  _loadTablet(e) {
    this.dispatch({
      type: "SET_TABLET",
      tablet: e.model.item
    });
    window.scrollTo(0,0);
    window.location = '#/tablet-overview';
  }
  
  _editTablet(e) {
    this.dispatch({
      type: "SET_TABLET",
      value: e.model.item
    });
    window.scrollTo(0,0);
    window.location = '#/tablet-designer';
  }
  
  _filterLibrary(library, searchTerm) {
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
  }
  
  _getIcon(shape) {
    return `app-icons:${shape}-tablet`;
  }
  
  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
        }
        page-layout {
          max-width: 1024px;
        }
        #search-layout {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin: 16px 32px 0px;
          max-width: var(--max-width);
          margin: auto;
        }
        #search-layout #search-icon {
          color: var(--text-light-color);
          margin-right: 8px;
        }
        #search-layout paper-input {
          color: var(--text-color);
          --paper-input-container-input-color: var(--text-color);
          --paper-input-container-color: var(--text-light-color);
          --paper-input-container-focus-color: var(--app-accent-color);
        } 
        
        /*Styles for Table and Cells*/
        #table {
          display: grid;
          grid-template-columns: 2fr 1fr auto auto auto auto;
          grid-template-rows: 48px;
          grid-auto-rows: auto;
          max-width: var(--max-width);
          margin: auto;
          background-color: var(--white-color);
          border-radius: 6px;
          border: var(--border-line);
        }
        #table .cell {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 16px;
          border-bottom: 1px solid var(--border-color);
        }
        #table .cell:nth-last-child(-n+7) {
          border-bottom: none;
        }
        
        /*Styles for buttons in table*/
        #table .icon-layout {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }
        #table .icon-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          align-self: center;
          padding: 4px;
          border-radius: 50%;
          color: #bdbdc3;
          background-color: var(--background-color);
          border: 2px solid #bdbdc3;
          transition: all 0.2s;
        }
        #table .icon-button:hover {
          cursor: pointer;
          color: var(--app-accent-color);
          border: 2px solid var(--app-accent-color);
          transition: all 0.2s;
        }
        #table .icon-button + .icon-button {
          margin-left: 12px;
        }
        #table .icon-button iron-icon {
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
          background-color: var(--app-primary-color);
          border-bottom: none;
          color: white;
        }
        #table .subtext {
          color: var(--text-light-color);
          font-size: 14px;
        }
        #table .number {
          text-align: center;
        }
      </style>
      
      <page-layout>
      
      <page-header>
        <div slot='title'>Tablet Core Library</div>
        <p slot='description'>
          Measure a compressed tablets dimensions, weight and bulk density
          and we can estimate important tablet properties for coating.
        </p>
      </page-header>
      
      <div id='search-layout'>
        <iron-icon id='search-icon' icon='app-icons:search'></iron-icon>
        <paper-input value='{{filterTerm}}' placeholder='Search Tablets...' no-label-float></paper-input>
      </div>
      
      <div id='table'>
          
          <div class='header cell'>Product</div>
          <div class='header cell'>Company</div>
          <div class='header cell'>Shape</div>
          <div class='header cell'>Dimensions</div>
          <div class='header cell'>Weight</div>
          <div class='header cell'></div>
          
          <template is='dom-repeat' items='[[_filterLibrary(firebaseLibrary, filterTerm)]]'>
            <div class='cell'>
              <div class='item-title'>[[item.productName]]</div>
              <div class='subtext'>[[item.formulationName]]</div>
            </div>
            <div class='cell'>
              <div>[[item.companyName]]</div>
              <div class='subtext'>[[item.contactName]]</div>
            </div>
            <div class='cell shape-icon'>
              <iron-icon icon='[[_getIcon(item.shape)]]'></iron-icon>
              <div class=''>[[item.shape]]</div>
            </div>
            <div class='cell number'>[[item.formatted.length]] x [[item.formatted.width]]</div>
            <div class='cell number'>[[item.formatted.weight]]</div>
            
            <div class='cell icon-layout'>
              <div class='icon-button' on-click='_loadTablet'>
                <iron-icon icon='app-icons:load'></iron-icon>
              </div>
              <div class='icon-button' on-click='_editTablet'>
                <iron-icon icon='app-icons:edit'></iron-icon>
              </div>
             
            </div> 
          </template>
          
      </div>
      
      </page-layout>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-library-page', TabletLibraryPage);