import { LitElement, html } from '@polymer/lit-element';
import { productIcon, rulerIcon } from '../components/app-icons.js';

import '../components/layouts/nav-page-layout.js';
import '../components/texts/page-main-title.js';
import '../components/texts/page-section-title.js';
import '../components/texts/page-section-subtitle.js';
import '../components/inputs/text-input.js';
import '../components/inputs/length-input.js';
import '../components/inputs/dropdown-input.js';
import '../components/tablet-elements/tablet-shape-selector.js';
import '../components/tablet-elements/tablet-dimensions-graphic.js';
import '../components/tablet-elements/tablet-thickness-graphic.js';


const dosageOptions = ["", "Tablet", "Softgel", "Hard Capsule"];
const marketOptions = ["", "Pharmaceutical", "Nutritional", "Other"];

class TabletPage extends LitElement {
  
  static get properties() {
    return {
      isRound: Boolean
    };
  }
  
  _render({ isRound }) {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block
        }
        p {
          font-size: 14px;
          color: var(--text-light-color);
          margin: 0px;
        }
        .two-column-input-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 16px;
          padding: 12px 0px 16px 0px;
        }
        .two-column-input-layout [wide] {
          grid-column: 1 / 3;
        }
        .input-graphic-layout {
          display: grid;
          grid-template-columns: 1fr 2fr;
          grid-gap: 16px;
          padding: 24px 0px 16px 0px;
        }
        .input-graphic-layout + .input-graphic-layout {
          margin-top: 16px;
        }
        .input-graphic-layout page-section-subtitle {
          padding: 0px;
        }
        .input-graphic-layout [input] {
          grid-column: 1 / 2;
        }
        .input-graphic-layout [graphic] {
          grid-column: 2 / 3;
          grid-row: 1 / 5;
        }
        
      </style>
      
      <nav-page-layout page='Tablet Design'>
      
        <page-main-title text='Design your tablet.'></page-main-title>
        <p>
          Measure a compressed tablets dimensions, weight and bulk density
          and we can estimate important tablet properties for coating.
        </p>
        
        <page-section-title text='General Information'></page-section-title>
        
        <p>
          Each product is unique. The tooling, formulation and even process
          can crete differences. Provide a descriptions of the product 
          and company who makes it to make it easy to identify.
        </p>
      
        <page-section-subtitle text='Product Description' icon=${ productIcon }></page-section-subtitle>
      
        <div class='two-column-input-layout'>
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
        </div>
        
        <page-section-subtitle text='Company Information' icon=${ productIcon }></page-section-subtitle>
        
        <div class='two-column-input-layout'>
          <text-input 
            label='Formulation' 
            path='tablet.companyName'
            action='SET_TABLET_COMPANY_NAME'>
          </text-input>
          
          <text-input 
            label='Formulation' 
            path='tablet.companyLocation'
            action='SET_TABLET_COMPANY_LOCATION'>
          </text-input>
          
          <text-input 
            label='Formulation' 
            path='tablet.contactName'
            action='SET_TABLET_CONTACT_NAME'>
          </text-input>
          
          <text-input 
            label='Formulation' 
            path='tablet.contactEmail'
            action='SET_TABLET_CONTACT_EMAIL'>
          </text-input>
        </div>
        
        <page-section-title text='Tablet Shape'></page-section-title>
        
        <p>
          Each product is unique. The tooling, formulation and even process
          can crete differences. Provide a descriptions of the product 
          and company who makes it to make it easy to identify.
        </p>
        
        <tablet-shape-selector></tablet-shape-selector>
        
        <page-section-title text='Tablet Dimensions'></page-section-title>
        
        <p>
          Each product is unique. The tooling, formulation and even process
          can crete differences. Provide a descriptions of the product 
          and company who makes it to make it easy to identify.
        </p>
      
        <div class='input-graphic-layout'>
        
          <page-section-subtitle input text='Dimensions' icon=${ rulerIcon }></page-section-subtitle>
        
          <length-input 
            input
            label='Length' 
            unit='mm'
            path='tablet.length'
            action='SET_TABLET_LENGTH'>
          </length-input>
          
          <length-input 
            input
            hidden$='${isRound}' 
            label='Width' 
            unit='mm'
            path='tablet.width'
            action='SET_TABLET_WIDTH'>
          </length-input>
          
          <tablet-dimensions-graphic graphic></tablet-dimensions-graphic>
          
          </div>
          
          <div class='input-graphic-layout'>
          
            <page-section-subtitle text='Thickness' icon=${ rulerIcon }></page-section-subtitle>
          
            <length-input 
              input
              label='Total Thickness' 
              unit='mm'
              path='tablet.totalThickness'
              action='SET_TABLET_TOTAL_THICKNESS'>
            </length-input>
            
            <length-input 
              input
              label='Band Thickness' 
              unit='mm'
              path='tablet.bandThickness'
              action='SET_TABLET_BAND_THICKNESS'>
            </length-input>
            
            <tablet-thickness-graphic graphic></tablet-thickness-graphic>
          
          </div>
        
      </nav-page-layout>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-page', TabletPage);