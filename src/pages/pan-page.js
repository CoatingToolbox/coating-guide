import { LitElement, html } from '@polymer/lit-element';
import { productIcon, rulerIcon, weightIcon } from '../components/app-icons.js';

import '../components/cards/basic-card.js';
import '../components/layouts/nav-page-layout.js';
import '../components/layouts/title-detail-layout.js';
import '../components/layouts/input-graphic-layout.js';
import '../components/layouts/two-column-input-layout.js';
import '../components/layouts/page-button-layout.js';
import '../components/texts/page-main-title.js';
import '../components/texts/page-section-title.js';
import '../components/texts/page-section-subtitle.js';
import '../components/inputs/text-input.js';
import '../components/texts/length-text.js';
import '../components/texts/description-text.js';
import '../components/texts/volume-text.js';
import '../components/inputs/length-input.js';
import '../components/buttons/next-page-button.js';
import '../components/buttons/last-page-button.js';


const dosageOptions = ["", "Tablet", "Softgel", "Hard Capsule"];
const marketOptions = ["", "Pharmaceutical", "Nutritional", "Other"];

class PanPage extends LitElement {
  
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
        page-main-title,
        .page-description {
          color: var(--white-color);
        }
        p {
          font-size: 14px;
          color: var(--text-light-color);
          margin: 0px;
        }
        
        title-detail-layout + title-detail-layout {
          border-top: 2px solid var(--border-color);
        }
        [hidden] {
          display: none;
        }
      </style>
      
      <nav-page-layout page='pan'>
      
        <page-main-title slot='title' text='Design your coating pan.'></page-main-title>
        <p class='page-description' slot='title'>
          Coating pans come in different makes and models and each of these can be customized
          with different baffles, gun setup and airhanders. Provide some info below
          so we can make recommendations on batch size, process parameters and more.
        </p>
        
        <basic-card>
        
        <page-section-title text='General Information'></page-section-title>
        
        <p>
          Each product is unique. The tooling, formulation and even process
          can crete differences. Provide a descriptions of the product 
          and company who makes it to make it easy to identify.
        </p>
      
      <two-column-input-layout>
      
        <page-section-subtitle wide text='Make & Model' icon=${ productIcon }></page-section-subtitle>
      
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
    
      <page-section-subtitle wide text='Company Information' icon=${ productIcon }></page-section-subtitle>
      
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