
import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
// import { productIcon } from '../components/app-icons.js';

import '../components/cards/basic-card.js';
import '../components/layouts/nav-page-layout.js';
import '../components/layouts/input-graphic-layout.js';
import '../components/layouts/title-detail-layout.js';
import '../components/layouts/page-button-layout.js';
import '../components/buttons/next-page-button.js';
import '../components/buttons/last-page-button.js';
import '../components/texts/page-main-title.js';
import '../components/texts/page-section-title.js';
import '../components/texts/page-section-subtitle.js';
import '../components/texts/page-section-description.js';
import '../components/texts/description-text.js';
import '../components/texts/area-text.js';
import '../components/texts/mass-text.js';
import '../components/texts/density-text.js';
import '../components/texts/percent-text.js';
import '../components/inputs/mass-input.js';
import '../components/inputs/percent-input.js';
import '../components/inputs/length-input.js';
import '../components/inputs/coverage-input.js';
import '../components/charts/coating-opacity-chart.js';


class CoatingAmountPage extends connect(store)(PageViewElement) {
     
  _stateChanged(state) {
      this.isClear = (state.coating.color.toLowerCase() == 'clear');
  }
  
  _render({ isClear }) {
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
</style>

<nav-page-layout>

    <page-main-title slot='title'>Coating Amount</page-main-title>

    
  <basic-card>
          
          <page-section-title>Materials & Equipment</page-section-title>
          
          <page-section-description>
            The amount of coating to apply is based on the tablet core and coating formula.
            The following are important properties of each to consider as we determine the
            optimal coating amount.
          </page-section-description>
          
          <title-detail-layout>
          
            <page-section-subtitle slot='title'>Tablet Core</page-section-subtitle>
            <description-text label='Name' path='tablet.productName'></description-text>
            <description-text label='Shape' path='tablet.shape'></description-text>
            <mass-text label='Weight' path='tablet.weight' unit='mg'></mass-text>
            <area-text label='Surface Area' path='tablet.totalArea' unit='cm2'></area-text>
    
          </title-detail-layout>
          
          
          
          <title-detail-layout>
            <page-section-subtitle slot='title'>Coating Formula</page-section-subtitle>
        
            <description-text label='Name' path='coating.productName'></description-text>
            <density-text label='Film Denstiy' path='coating.filmDensity' unit='g/ml'></density-text>
            <percent-text label='TiO2 Level' path='coating.percentTio2' unit='%'></percent-text>
          </title-detail-layout>
          
          </basic-card>
          
    <basic-card>
        <page-section-title>Coating Amount</page-section-title>
        <page-section-description>
            The ingredients used in the coating effect the density of the dispersion and film.
            Therefore using large amounts of dense ingredients like talc and titanium dioxide 
            change the optimal coating amount and the dispersion preperation.
        </page-section-description>
        <input-graphic-layout>
        
        <percent-input label='Weight Gain' path='coatingAmount.weightGain' unit='%' action='SET_COATING_AMOUNT_WEIGHT_GAIN'></percent-input>
        <mass-input label='Coating Weight' path='coatingAmount.coatingWeight' unit='mg' action='SET_COATING_AMOUNT_COATING_WEIGHT'></mass-input>
        
        </input-graphic-layout>
       
    </basic-card>
          
    <basic-card>
        <page-section-title>Coating Coverage</page-section-title>
        <page-section-description>
            The ingredients used in the coating effect the density of the dispersion and film.
            Therefore using large amounts of dense ingredients like talc and titanium dioxide 
            change the optimal coating amount and the dispersion preperation.
        </page-section-description>
        <input-graphic-layout>
        
        <percent-input label='Weight Gain' path='coatingAmount.weightGain' unit='%' action='SET_COATING_AMOUNT_WEIGHT_GAIN'></percent-input>
        <coverage-input label='Coating Coverage' path='coatingAmount.coatingCoverage' unit='mg/cm2' action='SET_COATING_AMOUNT_COATING_COVERAGE'></coverage-input>
        
        </input-graphic-layout>
       
    </basic-card>
          
    <basic-card>
        <page-section-title>Film Thickness</page-section-title>
        <page-section-description>
            The ingredients used in the coating effect the density of the dispersion and film.
            Therefore using large amounts of dense ingredients like talc and titanium dioxide 
            change the optimal coating amount and the dispersion preperation.
        </page-section-description>
        <input-graphic-layout>
        
        <percent-input label='Weight Gain' path='coatingAmount.weightGain' unit='%' action='SET_COATING_AMOUNT_WEIGHT_GAIN'></percent-input>
        <length-input label='Film Thickness' path='coatingAmount.filmThickness' unit='um' action='SET_COATING_AMOUNT_FILM_THICKNESS'></length-input>
        
        </input-graphic-layout>
       
    </basic-card>
    
    <basic-card>
        <page-section-title>Opacity</page-section-title>
        <page-section-description>
            The ingredients used in the coating effect the density of the dispersion and film.
            Therefore using large amounts of dense ingredients like talc and titanium dioxide 
            change the optimal coating amount and the dispersion preperation.
        </page-section-description>
        <input-graphic-layout>
        <percent-input label='Weight Gain' path='coatingAmount.weightGain' unit='%' action='SET_COATING_AMOUNT_WEIGHT_GAIN'></percent-input>
        <percent-input label='Opacity' path='coatingAmount.filmOpacity' unit='%' action='SET_COATING_AMOUNT_FILM_OPACITY'></percent-input>
        <coating-opacity-chart graphic></coating-opacity-chart>
        </input-graphic-layout>
       
    </basic-card>
    
    <page-button-layout>
        <last-page-button page='#coating'>Coating Formula</last-page-button>
        <next-page-button page='#batch'>Batch Size</next-page-button>
    </page-button-layout>


</nav-page-layout>`;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('coating-amount-page', CoatingAmountPage);