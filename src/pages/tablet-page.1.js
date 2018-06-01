import { LitElement, html } from '@polymer/lit-element';

import '../components/page-elements/page-layout.js';
import '../components/page-elements/page-header.js';
import '../components/page-elements/page-section.js';
import '../components/tablet-elements/tablet-product-card.js';
import '../components/tablet-elements/tablet-company-card.js';
import '../components/tablet-elements/tablet-shape-card.js';
import '../components/tablet-elements/tablet-dimensions-card.js';
import '../components/tablet-elements/tablet-thickness-card.js';

class TabletPage extends LitElement {
  
  _render () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
        }
        
        tablet-product-card {
          margin-bottom: 32px;
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
          <div slot='title'>Tablet Shape</div>
          <p slot='description'>
            Choose a shape that best desrcibes your tablet. The shape will 
            determine the model we use to predict the tablet properties. 
          </p>
        </page-section>
        
        <tablet-shape-card></tablet-shape-card>
        
        <page-section>
          <div slot='title'>Modeling A Compressed Tablet</div>
          <p slot='description'>
            Knowing the shape and basic dimensions of a compressed tablet we can
            predict many important tablet properties like surface area, compressed, 
            density and more.
            and 
          </p>
        </page-section>
        
        
        <tablet-thickness-card></tablet-thickness-card>
        
        <tablet-dimensions-card></tablet-dimensions-card>
        
        <tablet-layout tablet='[[tablet]]'></tablet-layout>
        
        
          
      </page-layout>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-page', TabletPage);