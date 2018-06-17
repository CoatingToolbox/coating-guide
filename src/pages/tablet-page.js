
import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
import { productIcon, rulerIcon, weightIcon, companyIcon, toolingIcon, concavityIcon, densityIcon } from '../components/app-icons.js';

import '../components/cards/basic-card.js';
import '../components/layouts/nav-page-layout.js';
import '../components/layouts/title-detail-layout.js';
import '../components/layouts/input-graphic-layout.js';
import '../components/layouts/two-column-input-layout.js';
import '../components/layouts/page-button-layout.js';
import '../components/texts/page-main-title.js';
import '../components/texts/page-description.js';
import '../components/texts/page-section-title.js';
import '../components/texts/page-section-subtitle.js';
import '../components/texts/page-section-description.js';
import '../components/inputs/text-input.js';
import '../components/texts/density-text.js';
import '../components/texts/length-text.js';
import '../components/texts/area-text.js';
import '../components/texts/description-text.js';
import '../components/texts/area-to-volume-text.js';
import '../components/texts/volume-text.js';
import '../components/inputs/length-input.js';
import '../components/inputs/mass-input.js';
import '../components/inputs/density-input.js';
import '../components/inputs/dropdown-input.js';
import '../components/inputs/tablet-shape-selector.js';
import '../components/graphics/tablet-dimensions-graphic.js';
import '../components/charts/bulk-density-chart.js';
import '../components/charts/tablet-weight-chart.js';
import '../components/buttons/next-page-button.js';
import '../components/buttons/last-page-button.js';


const dosageOptions = ["", "Tablet", "Softgel", "Hard Capsule"];
const marketOptions = ["", "Pharmaceutical", "Nutritional", "Other"];

class TabletPage extends connect(store)(PageViewElement) {
  
  static get properties() {
    return {
      dimensionsLine: String,
      lengthUnits: String,
      massUnits: String,
      isRound: Boolean
    };
  }
  
  _stateChanged(state) {
    this.isRound = (state.tablet.shape.toLowerCase() == 'round');
  }
  
  constructor() {
    super();
    this.lengthUnits = 'mm';
    this.massUnits = 'mg';
  }
  _render({ dimensionsLine, lengthUnits, massUnits, isRound }) {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
        }
        basic-card + basic-card {
          margin-top: 48px;
        }
        ul {
          max-width: 600px;
          margin: 16px auto 0px auto;
        }
        
        title-detail-layout + title-detail-layout {
          border-top: 2px solid var(--border-color);
        }
      </style>
      
      <nav-page-layout>
      
        <page-main-title slot='title'>Tablet Core</page-main-title>
        <basic-card>
        <page-section-title>General Information</page-section-title>
        
        <page-section-description>
          Each product is unique. The tooling, formulation and even process
          can create differences. Provide a descriptions of the product 
          and company information to make it easy to identify.
        </page-section-description>
      
      <two-column-input-layout>
      
        <page-section-subtitle title>${ productIcon } Product Description</page-section-subtitle>
      
        <text-input 
          wide 
          label='Name' 
          path='tablet.productName'
          action='SET_TABLET_PRODUCT_NAME'>
        </text-input>
          
        <text-input 
          label='Active Ingredient' 
          path='tablet.activeName'
          action='SET_TABLET_ACTIVE_NAME'>
        </text-input>
        
        <text-input 
          label='Formulation' 
          path='tablet.formulationName'
          action='SET_TABLET_ACTIVE_NAME'>
        </text-input>
        
        <dropdown-input 
          label='Dosage Form' 
          path='tablet.dosageForm'
          action='SET_TABLET_DOSAGE_FORM'
          options='${dosageOptions}'>
        </dropdown-input>
        
        <dropdown-input 
          label='Market' 
          path='tablet.productType'
          action='SET_TABLET_PRODUCT_TYPE' 
          options='${marketOptions}'>
        </dropdown-input>
      </two-column-input-layout>
        
      <two-column-input-layout>
      
        <page-section-subtitle title>${ companyIcon } Company Information</page-section-subtitle>
        
        <text-input 
          label='Company' 
          path='tablet.companyName'
          action='SET_TABLET_COMPANY_NAME'>
        </text-input>
        
        <text-input 
          label='Location' 
          path='tablet.companyLocation'
          action='SET_TABLET_COMPANY_LOCATION'>
        </text-input>
        
        <text-input 
          label='Contact' 
          path='tablet.contactName'
          action='SET_TABLET_CONTACT_NAME'>
        </text-input>
        
        <text-input 
          label='Email' 
          path='tablet.contactEmail'
          action='SET_TABLET_CONTACT_EMAIL'>
        </text-input>
      </two-column-input-layout>
      
    </basic-card>
    
    <basic-card>
        
        <page-section-title>Tablet Shape</page-section-title>
        
        <page-section-description>
          To get started select the 
          shape that best describes your tablet. This selection defines
          the model used in calculating the final tablet properties.
        </page-section-description>
        
        <tablet-shape-selector></tablet-shape-selector>
     </basic-card>   
     
     <basic-card>
        <page-section-title>Tablet Dimensions</page-section-title>
        
        <page-section-description>
          With the the compressed tablet provide the following easy to measure dimensions.
          <ul>
            <li><b>Length - </b> The longest dimension or diamter of a round tablet.</li>
            <li><b>Width - </b> The shortest dimension of an oval or caplet tablet.</li>
            <li><b>Total Thickness - </b> The thickness of the tablet at the peak concavity.</li>
            <li><b>Band Thickness - </b> The thickness of the tablet band only.</li>
          </ul>
        </page-section-description>
      
      
      <input-graphic-layout>
      
        
          <length-input 
            label='Length' 
            unit=${lengthUnits}
            path='tablet.length'
            action='SET_TABLET_LENGTH'
            on-click=${() => this.dimensionsLine = 'length'}
            on-unit-changed=${(e) => this.lengthUnits = e.detail.value}></length-input>
          
          <length-input 
            label='Width' 
            unit=${lengthUnits}
            path='tablet.width'
            action='SET_TABLET_WIDTH'
            style='display: ${isRound ? 'none' : 'grid'}'
            on-click='${() => this.dimensionsLine = 'width'}'
            on-unit-changed='${(e) => this.lengthUnits = e.detail.value}'></length-input>
          
            <length-input 
              label='Total Thickness' 
              unit=${lengthUnits}
              path='tablet.totalThickness'
              action='SET_TABLET_TOTAL_THICKNESS'
              on-click=${() => this.dimensionsLine = 'total'}
            on-unit-changed=${(e) => this.lengthUnits = e.detail.value} >
            </length-input>
            
            <length-input 
              label='Band Thickness' 
              unit=${lengthUnits}
              path='tablet.bandThickness'
              action='SET_TABLET_BAND_THICKNESS'
              on-click=${() => this.dimensionsLine = 'band'}
            on-unit-changed=${(e) => this.lengthUnits = e.detail.value}>
            </length-input>
            
          
            <tablet-dimensions-graphic graphic line='${dimensionsLine}'></tablet-dimensions-graphic>
          
          </input-graphic-layout>
          
          </basic-card>
          
          <basic-card>
        
          <page-section-title>Tablet Weight</page-section-title>
          
          <page-section-description>
            The average tablet weight and standard deviation are important parameters
            in determing the optimal coating amount. And the bulk density helps determine
            the appropriate batch size.
          </page-section-description>
          
          <input-graphic-layout>
          
            <mass-input
              label='Average Weight'
              unit=${massUnits}
              path='tablet.weight'
              action='SET_TABLET_WEIGHT'
            on-unit-changed=${(e) => this.massUnits = e.detail.value}></mass-input>
              
            <mass-input
              label='Standard Deviation'
              unit=${massUnits}
              path='tablet.weightStdev'
              action='SET_TABLET_WEIGHT_STDEV'
            on-unit-changed=${(e) => this.massUnits = e.detail.value}></mass-input>
            
            <tablet-weight-chart graphic></tablet-weight-chart>
          </input-graphic-layout>
          
          </basic-card>
          
          
          <basic-card>
        
          <page-section-title>Bulk Density</page-section-title>
          
          <page-section-description>
            The average tablet weight and standard deviation are important parameters
            in determing the optimal coating amount. And the bulk density helps determine
            the appropriate batch size.
          </page-section-description>
          
          <input-graphic-layout>
          
            <density-input
              label='Bulk Density'
              unit='g/ml'
              path='tablet.bulkDensity'
              action='SET_TABLET_BULK_DENSITY'></density-input>
              
            <bulk-density-chart graphic></bulk-density-chart>
              
          </input-graphic-layout>
          
          </basic-card>
          
          <basic-card>
          
          <page-section-title>Calcualted Properties</page-section-title>
          
          <page-section-description>
            Based on the above information properties of the tablet, tooling and concavity
            are calculated. We will use the tablet properties to determine the optimal amount
            of coating. The tooling and concavity information is for reference only but can 
            be used to understand how changes in your formulation would impact the final product.
          </page-section-description>
          
          <title-detail-layout>
          
            <page-section-subtitle slot='title'>${ concavityIcon } Tablet</page-section-subtitle>
          
              <density-text unit='g/ml' path='tablet.compressedDensity' label='Compressed Density' ></density-text>
              <area-text unit='mm2' path='tablet.totalArea' label='Surface Area' ></area-text>
              <volume-text unit='mm3' path='tablet.totalVolume' label='Volume' ></volume-text>
              <area-to-volume-text unit='mm-1' path='tablet.areaToVolume' label='SA / Vol' ></area-to-volume-text>
            
          </title-detail-layout>
          
          <title-detail-layout>
          
            <page-section-subtitle slot='title'>${ toolingIcon } Tooling</page-section-subtitle>
    
              <length-text unit='mm' path='tablet.perimeter' label='Perimeter' ></length-text>
              <area-text unit='mm2' path='tablet.crossSectionArea' label='Cross Section Area' ></area-text>
              <area-text unit='mm2' path='tablet.cupArea' label='Cup Area' ></area-text>
              <volume-text unit='mm3' path='tablet.cupVolume' label='Cup Volume' ></volume-text>
            
          </title-detail-layout>
          
          
          
          <title-detail-layout>
            <page-section-subtitle slot='title'>${ concavityIcon } Concavity</page-section-subtitle>
        
              <length-text unit='mm' path='tablet.cupThickness' label='Cup Depth' ></length-text>
              <length-text unit='mm' path='tablet.lengthCupRadius' label='Length Cup Radius' ></length-text>
              <length-text unit='mm' path='tablet.widthCupRadius' label='Width Cup Radius' 
                style='display: ${isRound ? 'none' : 'flex'}'></length-text>
              <description-text path='tablet.concavity' label='Concavity' ></description-text>
            
          </title-detail-layout>
          
          </basic-card>
          
          <page-button-layout>
          
            <last-page-button page='#overview'>Overview</last-page-button>
            <next-page-button page='#pan'>Coating Pan</next-page-button>
          
          </page-button-layout>
        
          
      </nav-page-layout>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-page', TabletPage);