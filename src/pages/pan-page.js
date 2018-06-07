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
import '../components/texts/page-section-description.js';
import '../components/texts/page-section-subtitle.js';
import '../components/inputs/text-input.js';
import '../components/inputs/length-input.js';
import '../components/inputs/airflow-input.js';
import '../components/inputs/dropdown-input.js';
import '../components/texts/length-text.js';
import '../components/texts/description-text.js';
import '../components/texts/volume-text.js';
import '../components/buttons/next-page-button.js';
import '../components/buttons/last-page-button.js';

const perforationOptions = ["", "Fully", "Partially", "Solid", "Other"];
const airflowOptions = ["", "Upper Right with Plenum", "Upper Right No Plenum", "Integrated Plenum", "Other"];
const baffleOptions = ["", "Ploughshare", "Rabbit", "Helical", "Sharkfin", "Other"];
const gunOptions = ["", "Spraying System", "Schlick", "Freund", "Other"];


class PanPage extends LitElement {
  
  static get properties() {
    return {
      lengthUnits: String
      
    };
  }
  
  constructor() {
    super();
    this.lengthUnits = 'in';
  }
  _render({ lengthUnits }) {
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
        page-main-title,
        .page-description {
          color: var(--white-color);
        }
        
        title-detail-layout + title-detail-layout {
          border-top: 2px solid var(--border-color);
        }
        [hidden] {
          display: none;
        }
      </style>
      
      <nav-page-layout>
      
        <page-main-title slot='title'>Design your coating pan.</page-main-title>
        <page-description slot='title'>
          Coating pans come in different makes and models and each of these can be customized
          with different baffles, gun setup and airhanders. Provide some info below
          so we can make recommendations on batch size, process parameters and more.
        </page-description>
        
        <basic-card>
        
        <page-section-title>General Information</page-section-title>
        
        <page-section-description>
          Each product is unique. The tooling, formulation and even process
          can crete differences. Provide a descriptions of the product 
          and company who makes it to make it easy to identify.
        </page-section-description>
      
      <two-column-input-layout>
      
        <page-section-subtitle title>${ productIcon } Make & Model</page-section-subtitle>
      
        <text-input 
          wide 
          label='Name' 
          path='pan.nickname'
          action='SET_PAN_NICKNAME'>
        </text-input>
          
        <text-input 
          label='Manufacturer' 
          path='pan.manufacturerName'
          action='SET_PAN_MANUFACTURER_NAME'>
        </text-input>
        
        <text-input 
          label='Formulation' 
          path='pan.modelName'
          action='SET_PAN_MODEL_NAME'>
        </text-input>
    </two-column-input-layout>
        
    <two-column-input-layout>
    
      <page-section-subtitle title>${ productIcon } Company Information</page-section-subtitle>
      
      <text-input 
        label='Company' 
        path='pan.companyName'
        action='SET_PAN_COMPANY_NAME'>
      </text-input>
      
      <text-input 
        label='Location' 
        path='pan.companyLocation'
        action='SET_PAN_COMPANY_LOCATION'>
      </text-input>
      
      <text-input 
        label='Contact' 
        path='pan.contactName'
        action='SET_PAN_CONTACT_NAME'>
      </text-input>
      
      <text-input 
        label='Email' 
        path='pan.contactEmail'
        action='SET_PAN_CONTACT_EMAIL'>
      </text-input>
    </two-column-input-layout>
    
  </basic-card>
  
  <basic-card>
        
        <page-section-title>Coating Pan Dimensions</page-section-title>
        
        <page-section-description>
          Each product is unique. The tooling, formulation and even process
          can crete differences. Provide a descriptions of the product 
          and company who makes it to make it easy to identify.
        </page-section-description>
        
        <input-graphic-layout>
        
        <page-section-subtitle title>Pan Height</page-section-subtitle>
        
          <length-input
            label='Drum Diameter'
            path='pan.mainDiameter'
            action='SET_PAN_MAIN_DIAMETER'
              unit='${ lengthUnits }'
              on-unit-changed=' ${ (e) => this.lengthUnits = e.detail.value }'>
          </length-input>
          
          <length-input
            label='Opening Diameter'
            path='pan.openingDiameter'
            action='SET_PAN_OPENING_DIAMETER'
              unit='${ lengthUnits }'
              on-unit-changed=' ${ (e) => this.lengthUnits = e.detail.value }'>
          </length-input>
        
        </input-graphic-layout>
        
        <input-graphic-layout>
        
  
  
        
        <page-section-subtitle title>Pan Depth</page-section-subtitle>
        
          <length-input
            label='Depth at Brim'
            path='pan.brimWidth'
            action='SET_PAN_BRIM_WIDTH'
              unit='${ lengthUnits }'
              on-unit-changed=' ${ (e) => this.lengthUnits = e.detail.value }'>
          </length-input>
          
          <length-input
            label='Depth at Perforated Wall'
            path='pan.wallWidth'
            action='SET_PAN_WALL_WIDTH'
              unit='${ lengthUnits }'
              on-unit-changed=' ${ (e) => this.lengthUnits = e.detail.value }'>
          </length-input>
        
        </input-graphic-layout>
  
  
  
  </basic-card>
  
          <basic-card>
        
        <page-section-title>Coating Pan Configuration</page-section-title>
        
        <page-section-description>
          Each product is unique. The tooling, formulation and even process
          can crete differences. Provide a descriptions of the product 
          and company who makes it to make it easy to identify.
        </page-section-description>
      
      <two-column-input-layout>
      
        <page-section-subtitle title>${ productIcon } Airflow</page-section-subtitle>
      
            
            
      
          <text-input 
            label='Airflow Directoin' 
            path='pan.airflowType'
            action='SET_PAN_AIRFLOW_TYPE'>
          </text-input>
            
            <dropdown-input 
              label='Perforation Type' 
              path='pan.perforationType'
              action='SET_PAN_PERFORATION_TYPE'
              options='${perforationOptions}'>
            </dropdown-input>
            
            <airflow-input 
              label='Max Airflow' 
              path='pan.maxAirflow'
              action='SET_PAN_MAX_AIRFLOW'
              unit='CFM'>
            </airflow-input>
      
      
    </two-column-input-layout>
        
    <two-column-input-layout>
    
      <page-section-subtitle title>Baffles</page-section-subtitle>
      
      
            
            <dropdown-input 
              label='Baffle Type' 
              path='pan.baffleType'
              action='SET_PAN_BAFFLE_TYPE'
              options='${baffleOptions}'>
            </dropdown-input>
            
            <unit-input 
              label='# of Baffles' 
              path='pan.baffleCount'
              action='SET_PAN_BAFFLE_COUNT'
              unit='baffles'
            _units='${ [{unit: 'baffles', text: 'baffles', multiplier: 1}] }'>
            </unit-input>
            
            <length-input 
              label='Baffle Height' 
              path='pan.baffleHeight'
              action='SET_PAN_BAFFLE_HEIGHT'
              unit='${ lengthUnits }'
              on-unit-changed=' ${ (e) => this.lengthUnits = e.detail.value }'>
            </length-input>
            
    </two-column-input-layout>
        
    <two-column-input-layout>
    
      <page-section-subtitle title>Spray Guns</page-section-subtitle>
      
            <dropdown-input 
              label='Manufacturer' 
              path='pan.gunMake'
              action='SET_PAN_GUN_MAKE'
              options='${gunOptions}'>
            </dropdown-input>
            
            
      
          <text-input 
            label='Model' 
            path='pan.model'
            action='SET_PAN_GUN_MODEL'>
          </text-input>
      
          <unit-input 
            label='Gun Count' 
            path='pan.gunCount'
            action='SET_PAN_GUN_COUNT'
            unit='guns'
            _units='${ [{unit: 'guns', text: 'guns', multiplier: 1}] }'>
          </unit-input>
            
            <length-input 
              label='Gun to Gun Distance' 
              path='pan.gunToGunDistance'
              action='SET_PAN_GUN_DISTANCE'
              unit='${ lengthUnits }'
              on-unit-changed=' ${ (e) => this.lengthUnits = e.detail.value }'>
            </length-input>
    
    </two-column-input-layout>
  </basic-card>
  
  <basic-card>
          
          <page-section-title>Calculated Properties</page-section-title>
          
          <page-section-description>
            Each product is unique. The tooling, formulation and even process
            can crete differences. Provide a descriptions of the product 
            and company who makes it to make it easy to identify.
          </page-section-description>
          
          <title-detail-layout>
          
            <page-section-subtitle slot='title' >Pan Volume</page-section-subtitle>
          
              <volume-text unit='l' path='pan.brimVolume' label='Brim Volume' ></volume-text>
              <volume-text unit='l' path='pan.maxFillVolume' label='Max Working Volume' ></volume-text>
              <volume-text unit='l' path='pan.minFillVolume' label='Min Working Volume' ></volume-text>
            
          </title-detail-layout>
          
          </basic-card>

          
  <page-button-layout>
  
    <last-page-button page='#tablet'>Tablet Core</last-page-button>
    <next-page-button page='#coating'>Coating Formula</next-page-button>
  
  </page-button-layout>
        
  
</nav-page-layout>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('pan-page', PanPage);