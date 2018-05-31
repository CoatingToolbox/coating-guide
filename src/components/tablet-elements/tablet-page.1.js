import { LitElement, html } from '@polymer/lit-element';

// import '@polymer/iron-selector/iron-selector.js';
// import '@material/mwc-icon';
import '../components/page-elements/page-layout.js';
import '../components/page-elements/page-header.js';
import '../components/page-elements/page-section.js';
import '../components/tablet-elements/tablet-product-card.js';
import '../components/tablet-elements/tablet-company-card.js';
import '../components/tablet-elements/tablet-shape-card.js';
import '../components/tablet-elements/tablet-dimensions-card.js';


// import '../components/card/card-with-toolbar.js';
// import '../components/card/card-info-section.js';
// import '../components/card/card-button.js';
// import '../components/card/card-basic.js';
// import '../components/card/card-inputs.js';
// import '../components/inputs/text-input.js';
// import '../components/inputs/dropdown-input.js';
// import '../components/inputs/length-input.js';
// import '../components/inputs/mass-input.js';
// import '../components/inputs/density-input.js';
// import '../components/graphics/tablet-layout.js';
// import '../components/charts/bulk-density-chart.js';

class TabletPage extends LitElement {
  
  static get properties () {
    return {
      tablet: {type: Object,  computed: '_computeTablet(_tablet)'},
      _tablet: { Object, statePath: 'tablet'},
      isRound: {type: Boolean, computed: '_computeIsRound(tablet.shape)'},
      dimensionUnits: {type: String, value: 'mm'},
      isAdmin: { type: Boolean, statePath: 'app.isAdmin'},
      dosageOptions: { 
        type: Array, 
        value: function() {
          return ["", "Tablet", "Softgel", "Hard Capsule"];
        }
      },
      marketOptions: {
        type: Array,
        value: function() {
          return ["", "Pharmaceutical", "Nutritional", "Other"];
        }
      }
    };
  }
  
  _stateChanged(state) {
    
  }
  
  // _computeIsRound(shape) {
  //   return shape === 'round';
  // }
  // _computeTablet(tablet) {
  //   // we create a copy to prevent data binding and direct changes to the redux state
  //   return Object.assign({}, tablet);
  // }
  // _saveTablet() {
  //   this.dispatch({
  //     type: "SET_TABLET",
  //     tablet: this.tablet
  //   });
  //   window.location = '#/tablet-overview';
  // }
  // _cancelTablet() {
  //   this.dispatch({
  //     type: "RESET_TABLET"
  //   });
  //   window.location = '#/tablet-overview';
  // }
  // _saveToFirebase() {
  //   if(!this.isAdmin) { return; }
  //   this.dispatch({
  //     type: "SAVE_TABLET_TO_FIREBASE",
  //     tablet: this.tablet
  //   });
  //   window.location = '#/tablet-library';
  // }
  // _replaceOnFirebase() {
  //   if(!this.isAdmin) { return; }
  //   this.dispatch({
  //     type: "REPLACE_TABLET_ON_FIREBASE",
  //     tablet: this.tablet
  //   });
  //   window.location = '#/tablet-library';
  // }
  
  _render () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
        }
        #shape-selector {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          margin: 48px auto;
          
        }
        #shape-selector [shape] {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: var(--background-color);
          border: 3px solid var(--border-color);
          border-radius: 12px;
          color: var(--text-light-color);
          font-size: 14px;
          padding: 16px 24px;
        }
        #shape-selector iron-icon {
          --iron-icon-width: 124px;
          --iron-icon-height: 124px;
          --iron-icon-fill-color: var(--border-color);
          --iron-icon-stroke-color: var(--border-color);
        }
        #shape-selector .iron-selected {
          border-color: var(--app-primary-color);
          color: var(--app-primary-color);
        }
        #shape-selector .iron-selected iron-icon {
          --iron-icon-fill-color: var(--app-primary-color);
          --iron-icon-stroke-color: var(--app-primary-color);
        }
        card-info-section + card-info-section {
          border-top: var(--border-line);
        }
        card-with-toolbar p {
          max-width: 600px;
        }
        .button-layout {
          display: flex;
          justify-content: flex-start;
        }
        card-button + card-button {
          margin-left: 48px;
        }
        #save-button {
          background-color: var(--app-accent-color);
          border-color: var(--app-accent-color);
          color: var(--white-color);
        }
        [hidden] {
          display: none;
        }
      </style>
      
      <page-layout>
      
      <page-header>
        <div slot='title'>Tablet Core Designer</div>
        <p slot='description'>
          Measure a compressed tablets dimensions, weight and bulk density
          and we can estimate important tablet properties for coating.
        </p>
      </page-header>
      
      <page-section>
        <div slot='title'>General Information</div>
        <p slot='description'>
          Each product is unique. The tooling, formulation and even process
          can crete differences. Provide a descriptions of the product 
          and company who makes it to make it easy to identify.
        </p>
      </page-section>
      
      <tablet-product-card></tablet-product-card>
      
      <tablet-company-card></tablet-company-card>
      
      <page-section>
        <div slot='title'>Compressed Tablet</div>
        <p slot='description'>
          Knowing the shape and basic dimensions of a compressed tablet we can
          predict many important tablet properties like surface area, compressed, 
          density and more.
          and 
        </p>
      </page-section>
      
      <tablet-shape-card></tablet-shape-card>
      
      <tablet-dimensions-card></tablet-dimensions-card>
      
      <tablet-layout tablet='[[tablet]]'></tablet-layout>
            
      
        <card-with-toolbar title='Tablet Weight & Density'>
          <p slot='card-description'>
            Provide additional details on the tablet weight.
          </p>
        
          <card-info-section title='Tablet Weight' icon='app-icons:weight'>
            <mass-input 
              label='Tablet Weight' 
              value='{{tablet.weight}}' 
              unit='mg'>
            </mass-input>
          </card-info-section>
          
          <card-info-section title='Bulk Density' icon='app-icons:density'>
            <density-input
              label='Bulk Density' 
              value='{{tablet.bulkDensity}}' 
              unit='g/ml'>
            </density-input>
            
            <bulk-density-chart id='chart' wide bulk-density='[[tablet.bulkDensity]]'></bulk-density-chart>
          </card-info-section>
          
        </card-with-toolbar>
      
      <card-with-toolbar title='Calculate Tablet Properties'>
          
        <card-info-section title='Save Changes' icon='app-icons:save'>
        
          <p wide>
            With the provided information other tablet properties will be calculated. This includes
            properties useful for coating such as tablet surface area and batch volume.
          </p>
          
          <div class='button-layout' wide>
            <card-button id='save-button' label='Calculate Tablet' on-click='_saveTablet'></card-button>
            <card-button label='Cancel Changes' on-click='_cancelTablet'></card-button>
          </div>
        </card-info-section>
        
        <card-info-section hidden$='[[!isAdmin]]' title='Firebase' icon='app-icons:save'>
          <p wide>
            Update current tablet or add new items to the tablet library saved on firebase.
          </p>
          <div class='button-layout' wide>
            <card-button label='Save to Firebase' on-click='_saveToFirebase'></card-button>
            <card-button label='Update on Firebase' on-click='_replaceOnFirebase'></card-button>
          </div>
        </card-info-section>
        
          
      </card-with-toolbar>
      
      </page-layout>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-page', TabletPage);