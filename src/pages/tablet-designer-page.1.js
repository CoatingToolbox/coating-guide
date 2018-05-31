
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { ReduxMixin } from '../redux-mixin.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/iron-icon/iron-icon.js';
import '../components/page-elements/page-layout.js';
import '../components/page-elements/page-header.js';
import '../components/card/card-with-toolbar.js';
import '../components/card/card-info-section.js';
import '../components/card/card-button.js';
import '../components/inputs/text-input.js';
import '../components/inputs/dropdown-input.js';
import '../components/inputs/length-input.js';
import '../components/inputs/mass-input.js';
import '../components/inputs/density-input.js';
import '../components/app-icons.js';
import '../components/graphics/tablet-layout.js';
import '../components/charts/bulk-density-chart.js';

class TabletDesignerPage extends ReduxMixin(PolymerElement) {
  
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
  
  _computeIsRound(shape) {
    return shape === 'round';
  }
  _computeTablet(tablet) {
    // we create a copy to prevent data binding and direct changes to the redux state
    return Object.assign({}, tablet);
  }
  _saveTablet() {
    this.dispatch({
      type: "SET_TABLET",
      tablet: this.tablet
    });
    window.location = '#/tablet-overview';
  }
  _cancelTablet() {
    this.dispatch({
      type: "RESET_TABLET"
    });
    window.location = '#/tablet-overview';
  }
  _saveToFirebase() {
    if(!this.isAdmin) { return; }
    this.dispatch({
      type: "SAVE_TABLET_TO_FIREBASE",
      tablet: this.tablet
    });
    window.location = '#/tablet-library';
  }
  _replaceOnFirebase() {
    if(!this.isAdmin) { return; }
    this.dispatch({
      type: "REPLACE_TABLET_ON_FIREBASE",
      tablet: this.tablet
    });
    window.location = '#/tablet-library';
  }
  
  static get template () {
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
      
        <card-with-toolbar title='General Information'>
          <p slot='card-description'>
            Provide a description of the product and customer.
          </p>
          
          <card-info-section title='Product Information' icon='app-icons:product-info'>
            
            <text-input 
              wide 
              label='Product' 
              value='{{tablet.productName}}'>
            </text-input>
            
            <text-input 
              label='Active Ingredient' 
              value='{{tablet.activeName}}'>
            </text-input>
            
            <text-input 
              label='Formulation' 
              value='{{tablet.formulationName}}'>
            </text-input>
          
            <dropdown-input 
              label='Dosage Form' 
              selected='{{tablet.dosageForm}}' 
              options='[[dosageOptions]]'>
            </dropdown-input>
            
            <dropdown-input 
              label='Market' 
              selected='{{tablet.productType}}' 
              options='[[marketOptions]]'>
            </dropdown-input>
          
          </card-info-section>
          
          <card-info-section title='Company Information'  icon='app-icons:company-info'>
           
            <text-input 
              label='Company' 
              value='{{tablet.companyName}}'>
            </text-input>
            
            <text-input 
              label='Location' 
              value='{{tablet.companyLocation}}'>
            </text-input>
            
            <text-input 
              label='Contact' 
              value='{{tablet.contactName}}'>
            </text-input>
            
            <text-input 
              label='Email' 
              value='{{tablet.contactEmail}}'>
            </text-input>
         
         </card-info-section>
         
        </card-with-toolbar>
      
      
      <card-with-toolbar title='Tablet Shape'>
        <p slot='card-description'>
          Select the shape that best describes the tablet.
        </p>
        <iron-selector id='shape-selector' wide selected='{{tablet.shape}}' attr-for-selected='shape'>
       
        <div shape='round'>
          <iron-icon icon='app-icons:round-tablet'></iron-icon>
          <div>Round</div>
        </div>
        
        <div shape='oval'>
          <iron-icon icon='app-icons:oval-tablet'></iron-icon>
          <div>Oval</div>
        </div>
        
        <div shape='caplet'>
          <iron-icon icon='app-icons:caplet-tablet'></iron-icon>
          <div>Caplet</div>
        </div>
        
        </iron-selector>
      </card-with-toolbar>
      
      
        
        <card-with-toolbar title='Compressed Tablet'>
          <p slot='card-description'>
            Input the dimensions based on a compressed tablet.
          </p>
          
          <card-info-section title='Dimensions' icon='app-icons:ruler'>
            
            <length-input 
              label='Length' 
              value='{{tablet.length}}' 
              unit='{{dimensionUnits}}'>
            </length-input>
            
            <length-input 
              hidden$='{{isRound}}' 
              label='Width' 
              value='{{tablet.width}}' 
              unit='{{dimensionUnits}}'>
            </length-input>
            
            <length-input 
              label='Total Thickness' 
              value='{{tablet.totalThickness}}' 
              unit='{{dimensionUnits}}'>
            </length-input>
            
            <length-input 
              label='Band Thickness' 
              value='{{tablet.bandThickness}}' 
              unit='{{dimensionUnits}}'>
            </length-input>
          
          </card-info-section>
          
        </card-with-toolbar>
        
        <card-with-toolbar title='Tablet Schematic'>
            <tablet-layout tablet='[[tablet]]'></tablet-layout>
        </card-with-toolbar>
      
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
customElements.define('tablet-designer-page', TabletDesignerPage);