
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { ReduxMixin } from '../redux-mixin.js';
import '../components/card/card-with-toolbar.js';
import '../components/card/card-button.js';
import '../components/card/card-info-section.js';
import '../components/card/card-info-item.js';
import '../components/header/page-layout.js';
import '../components/header/page-header.js';
import '../components/header/page-header-button.js';
import '../components/graphics/pan-layout.js';

class PanOverviewPage extends ReduxMixin(PolymerElement) {
  static get properties () {
    return {
      pan: { type: Object, statePath: 'pan' }
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
        card-info-section + card-info-section {
          border-top: var(--border-line);
        }
        card-with-toolbar a + a {
          margin-left: 16px;
        }
        pan-layout {
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
        <div slot='title'>Coating Pan Overview</div>
        <p slot='description'>
          Review the current selected tablet and make changes with the tablet designer
          or load a tablet from the library.
        </p>
      </page-header>
      
        <card-with-toolbar title='General Information'>
          <a href='#/pan-designer' slot='toolbar'>
           <card-button label='Edit'></card-button>
          </a>
          <card-info-section title='Equipment Information' icon='app-icons:product-info'>
            <card-info-item wide label='Name' capitalize>[[pan.nickname]]</card-info-item>
            <card-info-item wide label='Model' capitalize>[[pan.modelName]]</card-info-item>
            <card-info-item wide label='Manufacturer' capitalize>[[pan.manufacturerName]]</card-info-item>
          </card-info-section>
          
          <card-info-section title='Company Information' icon='app-icons:company-info'>
            <card-info-item wide label='Company' capitalize>[[pan.companyName]]</card-info-item>
            <card-info-item wide label='Location' capitalize>[[pan.companyLocation]]</card-info-item>
            <card-info-item wide label='Contact' capitalize>[[pan.contactName]]</card-info-item>
            <card-info-item wide label='Email'>[[pan.contactEmail]]</card-info-item>
          </card-info-section>
        </card-with-toolbar>
      
      <card-with-toolbar title='Coating Pan Size'>
          <a href='#/pan-designer' slot='toolbar'>
           <card-button label='Edit'></card-button>
          </a>
        
        <card-info-section title='Dimensions' icon='app-icons:ruler'>
          <card-info-item wide label='Drum Diameter'>[[pan.formatted.panDiameter]]</card-info-item>
          <card-info-item wide label='Opening Diameter'>[[pan.formatted.openingDiameter]]</card-info-item>
          <card-info-item wide label='Depth at Brim'>[[pan.formatted.brimWidth]]</card-info-item>
          <card-info-item wide label='Height to Brim'>[[pan.formatted.brimHeight]]</card-info-item>
        </card-info-section>
        
        <card-info-section title='Volume' icon='app-icons:volume'>
          <card-info-item wide label='Brim Volume'>[[pan.formatted.brimVolume]]</card-info-item>
          <card-info-item wide label='Max Working Volume'>[[pan.formatted.maxFillVolume]]</card-info-item>
          <card-info-item wide label='Min Working Volume'>[[pan.formatted.minFillVolume]]</card-info-item>
        </card-info-section>
      </card-with-toolbar>
      
      <card-with-toolbar title='Coating Pan Schematic'>
          <pan-layout pan='[[pan]]'></pan-layout>
      </card-with-toolbar>
      
      <card-with-toolbar title='Coating Pan Setup'>
          <a href='#/pan-designer' slot='toolbar'>
           <card-button label='Edit'></card-button>
          </a>
        <card-info-section title='Airhandler' icon='app-icons:airhandler'>
          <card-info-item wide label='Perfortion' capitalize>[[pan.perforationType]]</card-info-item>
          <card-info-item wide label='Airflow Type' capitalize>[[pan.airflowType]]</card-info-item>
          <card-info-item wide label='Max Airflow'>[[pan.maxAirflow]] cfm</card-info-item>
        </card-info-section>
        
        <card-info-section title='Baffles' icon='app-icons:mix'>
          <card-info-item wide label='Baffle Type'>[[pan.baffleType]]</card-info-item>
          <card-info-item wide label='Number of Baffles'>[[pan.baffleCount]]</card-info-item>
          <card-info-item wide label='Max Baffle Height'>[[pan.formatted.baffleHeight]]</card-info-item>
        </card-info-section>
        
        <card-info-section title='Spray Guns' icon='app-icons:spray'>
          <card-info-item wide label='Manufacturer'>[[pan.gunMake]]</card-info-item>
          <card-info-item wide label='Model'>[[pan.gunModel]]</card-info-item>
          <card-info-item wide label='Number'>[[pan.gunCount]]</card-info-item>
          <card-info-item wide label='Distance Between'>[[pan.formatted.gunToGunDistance]]</card-info-item>
        </card-info-section>
      </card-with-toolbar>
      </page-layout>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('pan-overview-page', PanOverviewPage);