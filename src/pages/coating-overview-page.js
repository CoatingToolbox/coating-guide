
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { ReduxMixin } from '../redux-mixin.js';
import '../components/card/card-with-toolbar.js';
import '../components/card/card-button.js';
import '../components/card/card-info-section.js';
import '../components/card/card-info-item.js';
import '../components/header/page-layout.js';
import '../components/header/page-header.js';
import '../components/header/page-header-button.js';
import '../components/charts/coating-viscosity-chart.js';

class CoatingOverviewPage extends ReduxMixin(PolymerElement) {
  static get properties () {
    return {
      coating: { type: Object, statePath: 'coating' }
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
        <div slot='title'>Coating Formulation Overview</div>
        <p slot='description'>
          Review the current selected tablet and make changes with the tablet designer
          or load a tablet from the library.
        </p>
      </page-header>
      
      
        <card-with-toolbar title='General Information'>
          <a href='#/pan-designer' slot='toolbar'>
           <card-button label='Edit'></card-button>
          </a>
          <card-info-section title='Product Details' icon='app-icons:product-info'>
            <card-info-item wide label='Name' capitalize>[[coating.productName]]</card-info-item>
            <card-info-item wide label='Formula' capitalize>[[coating.formulaName]]</card-info-item>
            <card-info-item wide label='Color' capitalize>[[coating.color]]</card-info-item>
          </card-info-section>
          <card-info-section title='Recommendations' icon='app-icons:airhandler'>
            <card-info-item wide label='Dispersion Solids' capitalize>[[coating.formatted.recommendedSolids]]</card-info-item>
            <card-info-item wide label='Product Temperature' capitalize>[[coating.formatted.recommendProductTemp]]</card-info-item>
            <card-info-item wide label='Coating Amout'>[[coating.formatted.recommendedWG]] cfm</card-info-item>
          </card-info-section>
        </card-with-toolbar>
      
      
      <card-with-toolbar title='Coating Properties'>
          <a href='#/pan-designer' slot='toolbar'>
           <card-button label='Edit'></card-button>
          </a>
        
        <card-info-section title='Film Properties' icon='app-icons:ruler'>
          <card-info-item wide label='Film Density'>[[coating.formatted.filmDensity]]</card-info-item>
          <card-info-item wide label='Opacity'>[[coating.formatted.filmOpacity]]</card-info-item>
        </card-info-section>
        <card-info-section title='Viscosity Profile' icon='app-icons:ruler'>
          <coating-viscosity-chart wide viscosity='[[coating.data.viscosity]]'></coating-viscosity-chart>
        </card-info-section>
      </card-with-toolbar>
      
      </page-layout>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('coating-overview-page', CoatingOverviewPage);