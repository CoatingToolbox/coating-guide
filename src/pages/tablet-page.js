import { LitElement, html } from '@polymer/lit-element';
import { productIcon, rulerIcon, weightIcon } from '../components/app-icons.js';

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
import '../components/tablet-elements/tablet-shape-selector.js';
import '../components/tablet-elements/tablet-dimensions-graphic.js';
import '../components/tablet-elements/tablet-thickness-graphic.js';
import '../components/tablet-elements/bulk-density-chart.js';
import '../components/tablet-elements/tablet-weight-chart.js';
import '../components/buttons/next-page-button.js';
import '../components/buttons/last-page-button.js';


const dosageOptions = ["", "Tablet", "Softgel", "Hard Capsule"];
const marketOptions = ["", "Pharmaceutical", "Nutritional", "Other"];

class TabletPage extends LitElement {
  
  static get properties() {
    return {
      dimensionsLine: String,
      lengthUnits: String,
      massUnits: String,
    };
  }
  
  constructor() {
    super();
    this.lengthUnits = 'mm';
    this.massUnits = 'mg';
  }
  _updateInputDisplay(shape){
    if(shape === 'round') {
      this.shadowRoot.querySelector('#widthInput').setAttribute('hidden', '');
      this.shadowRoot.querySelector('#widthCupRadiusText').setAttribute('hidden', '');
    } else {
      this.shadowRoot.querySelector('#widthInput').removeAttribute('hidden');
      this.shadowRoot.querySelector('#widthCupRadiusText').removeAttribute('hidden');
    }
  }
  _render({ dimensionsLine, lengthUnits, massUnits }) {
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
        
        title-detail-layout + title-detail-layout {
          border-top: 2px solid var(--border-color);
        }
        [hidden] {
          display: none;
        }
      </style>
      
      <nav-page-layout>
      
        <page-main-title slot='title'>Tablet Core</page-main-title>
        <page-description slot='title'>
          Measure a compressed tablets dimensions, weight and bulk density
          and we can estimate important tablet properties for coating.
        </page-description>
        
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
      
        <page-section-subtitle title>${ productIcon } Company Information</page-section-subtitle>
        
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
        
        <tablet-shape-selector on-shape-changed=${ (e) => this._updateInputDisplay(e.detail.value)}></tablet-shape-selector>
     </basic-card>   
     
     <basic-card>
        <page-section-title>Tablet Dimensions</page-section-title>
        
        <page-section-description>
          With the the compressed tablet provide the following easy to measure dimensions.
          <ul>
            <li><b>Length:</b> - The longest dimension or diamter of a round tablet.</li>
            <li><b>Width:</b> - The shortest dimension of an oval or caplet tablet.</li>
            <li><b>Total Thickness:</b> - The thickness of the tablet at the peak concavity.</li>
            <li><b>Band Thickness:</b> - The thickness of the tablet band only.</li>
          </ul>
        </page-section-description>
      
      
      <input-graphic-layout>
      
        <page-section-subtitle title>${ rulerIcon } Tablet Weight</page-section-subtitle>
        
          <length-input 
            label='Length' 
            unit=${lengthUnits}
            path='tablet.length'
            action='SET_TABLET_LENGTH'
            on-click=${() => this.dimensionsLine = 'length'}
            on-unit-changed=${(e) => this.lengthUnits = e.detail.value}>
          </length-input>
          
          <length-input 
            id='widthInput'
            label='Width' 
            unit=${lengthUnits}
            path='tablet.width'
            action='SET_TABLET_WIDTH'
            on-click=${() => this.dimensionsLine = 'width'}
            on-unit-changed=${(e) => this.lengthUnits = e.detail.value} >
          </length-input>
          
            <tablet-dimensions-graphic graphic line='${dimensionsLine}'></tablet-dimensions-graphic>
          
          </input-graphic-layout>
          
          
          <input-graphic-layout>
          
          <page-section-subtitle title>${ rulerIcon } Compressed Tablet Thickness</page-section-subtitle>
          
          
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
            
            <tablet-thickness-graphic graphic line='${dimensionsLine}'></tablet-thickness-graphic>
          
          </input-graphic-layout>
          
          </basic-card>
          
          <basic-card>
        
          <page-section-title>Weight & Density</page-section-title>
          
          <page-section-description>
            The average tablet weight and standard deviation are important parameters
            in determing the optimal coating amount. And the bulk density helps determine
            the appropriate batch size.
          </page-section-description>
          
          <input-graphic-layout>
          
          <page-section-subtitle title>${ weightIcon } Tablet Weight</page-section-subtitle>
          
          
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
          
          <input-graphic-layout>
          
          <page-section-subtitle title>${ weightIcon } Tablet Bulk Density</page-section-subtitle>
          
          
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
          
            <page-section-subtitle slot='title'>${ weightIcon } Tablet</page-section-subtitle>
          
              <density-text unit='g/ml' path='tablet.compressedDensity' label='Compressed Density' ></density-text>
              <area-text unit='mm2' path='tablet.totalArea' label='Surface Area' ></area-text>
              <volume-text unit='mm3' path='tablet.totalVolume' label='Volume' ></volume-text>
              <area-to-volume-text unit='mm-1' path='tablet.areaToVolume' label='SA / Vol' ></area-to-volume-text>
            
          </title-detail-layout>
          
          <title-detail-layout>
          
            <page-section-subtitle slot='title'>${ weightIcon } Tooling</page-section-subtitle>
    
              <length-text unit='mm' path='tablet.perimeter' label='Perimeter' ></length-text>
              <area-text unit='mm2' path='tablet.crossSectionArea' label='Cross Section Area' ></area-text>
              <area-text unit='mm2' path='tablet.cupArea' label='Cup Area' ></area-text>
              <volume-text unit='mm3' path='tablet.cupVolume' label='Cup Volume' ></volume-text>
            
          </title-detail-layout>
          
          
          
          <title-detail-layout>
            <page-section-subtitle slot='title'>${ weightIcon } Concavity</page-section-subtitle>
        
              <length-text unit='mm' path='tablet.cupThickness' label='Cup Depth' ></length-text>
              <length-text unit='mm' path='tablet.lengthCupRadius' label='Length Cup Radius' ></length-text>
              <length-text id='widthCupRadiusText' unit='mm' path='tablet.widthCupRadius' label='Width Cup Radius' ></length-text>
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