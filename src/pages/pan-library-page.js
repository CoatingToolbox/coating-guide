
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { ReduxMixin } from '../redux-mixin.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '../components/header/page-layout.js';
import '../components/header/page-header.js';
import '../components/app-icons.js';

class PanLibraryPage extends ReduxMixin(PolymerElement) {
  static get properties () {
    return {
      filterTerm: String,
      firebaseLibrary: Array
    };
  }
  
  ready() {
    super.ready();
    
    firebase.database().ref('pans/').on('value', snapshot => {
      let library = [];
      snapshot.forEach(child => {
        library.push(child.val());
      });
      this.firebaseLibrary = library;
    });
  }
  
  _load(e) {
    this.dispatch({
      type: "SET_PAN",
      pan: e.model.item
    });
    window.scrollTo(0,0);
    window.location = '#/pan-overview';
  }
  
  _edit(e) {
    this.dispatch({
      type: "SET_PAN",
      pan: e.model.item
    });
    window.scrollTo(0,0);
    window.location = '#/pan-designer';
  }
  
  _filterLibrary(library, searchTerm) {
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
          grid-template-columns: 2fr 1fr 1fr auto auto auto auto;
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
        <div slot='title'>Coating Pan Library</div>
        <p slot='description'>
          Measure a compressed tablets dimensions, weight and bulk density
          and we can estimate important tablet properties for coating.
        </p>
      </page-header>
      
      <div id='search-layout'>
        <iron-icon id='search-icon' icon='my-icons:search'></iron-icon>
        <paper-input value='{{filterTerm}}' placeholder='Search Coating Pans...' no-label-float></paper-input>
      </div>
      
      <div id='table'>
        <div class='header cell'>Name</div>
        <div class='header cell'>Equipment</div>
        <div class='header cell'>Location</div>
        <div class='header cell'>Diameter</div>
        <div class='header cell'>Brim Volume</div>
        <div class='header cell'>Working Volume</div>
        <div class='header cell'></div>
        
        <template is='dom-repeat' items='[[_filterLibrary(firebaseLibrary, filterTerm)]]'>
          <div class='cell'>
            <div class='item-title'>[[item.nickname]]</div>
          </div>
          <div class='cell'>
            <div class='item-title'>[[item.modelName]]</div>
            <div class='subtext'>[[item.manufacturerName]]</div>
          </div>
          <div class='cell'>
            <div>[[item.companyName]]</div>
            <div class='subtext'>[[item.companyLocation]]</div>
          </div>
          <div class='cell number'>[[item.formatted.panDiameter]]</div>
          <div class='cell number'>[[item.formatted.brimVolume]]</div>
          <div class='cell number'>[[item.formatted.volumeRange]]</div>
          <div class='cell icon-layout'>
            <div class='icon-button' on-click='_load'>
              <iron-icon icon='app-icons:load'></iron-icon>
            </div>
            <div class='icon-button' on-click='_edit'>
              <iron-icon icon='app-icons:edit'></iron-icon>
            </div>
           
          </div> 
        </template>
        
      </div>   
      
    </div>  
    
    </page-layout>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('pan-library-page', PanLibraryPage);