import { LitElement, html } from '@polymer/lit-element';
import { productIcon } from '../components/app-icons.js';

import '../components/layouts/nav-page-layout.js';
import '../components/headers/page-main-header.js';
import '../components/texts/page-main-title.js';
import '../components/texts/page-section-title.js';
import '../components/texts/page-section-subtitle.js';
import '../components/inputs/text-input.js';
import '../components/inputs/dropdown-input.js';
import '../components/tablet-elements/tablet-shape-selector.js';


const dosageOptions = ["", "Tablet", "Softgel", "Hard Capsule"];
const marketOptions = ["", "Pharmaceutical", "Nutritional", "Other"];

class TabletPage extends LitElement {
  
  _render() {
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
        }
      </style>
      
      <nav-page-layout page='Tablet Designer'>
      
        <page-main-header>
          <page-main-title text='Design your tablet.'></page-main-title>
          <p>
            Measure a compressed tablets dimensions, weight and bulk density
            and we can estimate important tablet properties for coating.
          </p>
        </page-main-header>
        
        <page-section-title text='General Information'></page-section-title>
        
        <p>
          Each product is unique. The tooling, formulation and even process
          can crete differences. Provide a descriptions of the product 
          and company who makes it to make it easy to identify.
        </p>
      
        <page-section-subtitle text='Product Description' icon=${ productIcon }></page-section-subtitle>
      
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
        
        
        <page-section-subtitle text='Company Information' icon=${ productIcon }></page-section-subtitle>
        
        
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
        
        <tablet-shape-selector></tablet-shape-selector>
        
        
      </nav-page-layout>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-page', TabletPage);