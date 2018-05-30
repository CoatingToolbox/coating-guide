
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { ReduxMixin } from '../redux-mixin.js';
import '../components/page-elements/page-layout.js';
import '../components/card/card-with-toolbar.js';
import '../components/card/card-button.js';
import '../components/card/card-info-section.js';
import '../components/card/card-info-item.js';
import '../components/page-elements/page-header.js';
import '../components/page-elements/page-header-button.js';
import '../components/graphics/tablet-layout.js';

class TabletOverviewPage extends ReduxMixin(PolymerElement) {
  static get properties () {
    return {
      tablet: { type: Object, statePath: 'tablet' }
    };
  }
  
  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
        }
        card-with-toolbar a + a {
          margin-left: 16px;
        }
        card-info-section + card-info-section {
          border-top: var(--border-line);
        }
        tablet-layout {
          margin: 32px auto 24px;
        }
        .capitalize {
          text-transform: capitalize;
        }
        [hidden] {
          display: none !important;
        }
      </style>
      
      <page-layout>
      
      <page-header>
        <div slot='title'>Tablet Core Overview</div>
        <p slot='description'>
          Review the current selected tablet and make changes with the tablet designer
          or load a tablet from the library.
        </p>
      </page-header>
      
      <card-with-toolbar title='Tablet Description' highlight-title>
        <a href='#/tablet-designer' slot='toolbar'>
         <card-button label='Edit'></card-button>
        </a>
        <card-info-section title='Description' icon='app-icons:product-info'>
          <card-info-item wide label='Product Name' class='capitalize'>[[tablet.productName]]</card-info-item>
          <card-info-item wide label='Active Ingredient' class='capitalize'>[[tablet.activeName]]</card-info-item>
          <card-info-item wide label='Market' class='capitalize'>[[tablet.productType]]</card-info-item>
          <card-info-item wide label='Dosage Form' class='capitalize'>[[tablet.dosageForm]]</card-info-item>
          <card-info-item wide label='Formulation' class='capitalize'>[[tablet.formulationName]]</card-info-item>
        </card-info-section>
        
        <card-info-section title='Contact Infomration' icon='app-icons:company-info'>
          <card-info-item wide label='Company' class='capitalize'>[[tablet.companyName]]</card-info-item>
          <card-info-item wide label='Location' class='capitalize'>[[tablet.companyLocation]]</card-info-item>
          <card-info-item wide label='Contact' class='capitalize'>[[tablet.contactName]]</card-info-item>
          <card-info-item wide label='Email'>[[tablet.contactEmail]]</card-info-item>
        </card-info-section>
      </card-with-toolbar>
      
      
      <card-with-toolbar title='Tablet Information'>
          <a href='#/tablet-designer' slot='toolbar'>
           <card-button label='Edit'></card-button>
          </a>
        
        <card-info-section title='Shape & Size' icon='app-icons:ruler'>
          <card-info-item wide label='Shape' class='capitalize'>[[tablet.shape]]</card-info-item>
          <card-info-item wide label='Length'>[[tablet.formatted.length]]</card-info-item>
          <card-info-item wide label='Width' hidden$=[[tablet.isRound]]>[[tablet.formatted.width]]</card-info-item>
          <card-info-item wide label='Thickness'>[[tablet.formatted.totalThickness]]</card-info-item>
        </card-info-section>
        
        <card-info-section title='Weight & Density' icon='app-icons:weight'>
          <card-info-item wide label='Weight'>[[tablet.formatted.weight]]</card-info-item>
          <card-info-item wide label='Compressed Density'>[[tablet.formatted.compressedDensity]]</card-info-item>
          <card-info-item wide label='Bulk Density'>[[tablet.formatted.bulkDensity]]</card-info-item>
        </card-info-section>
        
        <card-info-section title='Surface Area & Volume' icon='app-icons:surface-area'>
          <card-info-item wide label='Surface Area'>[[tablet.formatted.totalArea]]</card-info-item>
          <card-info-item wide label='Volume'>[[tablet.formatted.totalVolume]]</card-info-item>
          <card-info-item wide label='Area / Volume'>[[tablet.formatted.areaToVolume]]</card-info-item>
        </card-info-section>
      </card-with-toolbar>
      
      <card-with-toolbar title='Tablet Schematic'>
          <tablet-layout tablet='[[tablet]]'></tablet-layout>
      </card-with-toolbar>
      
      <card-with-toolbar title='Tooling Information'>
          <a href='#/tablet-designer' slot='toolbar'>
           <card-button label='Edit'></card-button>
          </a>
        <card-info-section title='Concavity' icon='app-icons:concavity'>
          <card-info-item wide label='Concavity' class='capitalize'>[[tablet.concavity]]</card-info-item>
          <card-info-item wide label='Cup Depth'>[[tablet.formatted.cupDepth]]</card-info-item>
          <card-info-item wide label='Length Cup Radius'>[[tablet.formatted.lengthCupRadius]]</card-info-item>
          <card-info-item wide label='Width Cup Radius' hidden$=[[tablet.isRound]]>[[tablet.formatted.widthCupRadius]]</card-info-item>
        </card-info-section>
        
        <card-info-section title='Tooling Details' icon='app-icons:tooling'>
          <card-info-item wide label='Perimeter'>[[tablet.formatted.perimeter]]</card-info-item>
          <card-info-item wide label='Cross Section Area'>[[tablet.formatted.crossSectionArea]]</card-info-item>
          <card-info-item wide label='Cup Surface Area'>[[tablet.formatted.cupArea]]</card-info-item>
          <card-info-item wide label='Cup Volume'>[[tablet.formatted.cupVolume]]</card-info-item>
        </card-info-section>
      </card-with-toolbar>
      
      </page-layout>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-overview-page', TabletOverviewPage);