
import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
import { productIcon } from '../components/app-icons.js';

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
import '../components/texts/density-text.js';
import '../components/texts/mass-text.js';
import '../components/texts/volume-text.js';
import '../components/texts/length-text.js';
import '../components/inputs/tens-input.js';
import '../components/inputs/mass-input.js';
import '../components/inputs/volume-input.js';
import '../components/inputs/percent-input.js';


class BatchPage extends connect(store)(PageViewElement) {
     
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

    <page-main-title slot='title'>Batch Size</page-main-title>

    
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
            <mass-text label='Tablet Weight' path='tablet.weight' unit='mg'></mass-text>
            <density-text label='Bulk Density' path='tablet.bulkDensity' unit='g/ml'></density-text>
    
          </title-detail-layout>
          
          <title-detail-layout>
            <page-section-subtitle slot='title'>Coating Pan</page-section-subtitle>
        
            <description-text label='Name' path='pan.nickname'></description-text>
            <length-text label='Diameter' path='pan.mainDiameter' unit='in'></length-text>
            <volume-text label='Brim Volume' path='pan.brimVolume' unit='l'></volume-text>
          </title-detail-layout>
          
          </basic-card>
          
    <basic-card>
        <page-section-title>Batch Size</page-section-title>
        <page-section-description>
            The ingredients used in the coating effect the density of the dispersion and film.
            Therefore using large amounts of dense ingredients like talc and titanium dioxide 
            change the optimal coating amount and the dispersion preperation.
        </page-section-description>
        <input-graphic-layout>
        
        <tens-input
          label='Count'
          path='batch.tabletCount'
          step='1'
          action='SET_BATCH_TABLET_COUNT'></tens-input>
          
        <mass-input
          label='Weight'
          path='batch.batchWeight'
          action='SET_BATCH_WEIGHT'
          unit='kg'></mass-input>
          
        <volume-input
          label='Volume'
          path='batch.batchVolume'
          action='SET_BATCH_VOLUME'
          unit='l'></volume-input>
          
        <percent-input
          label='Fill Percent'
          path='batch.batchFillVolumePercent'
          action='SET_BATCH_VOLUME_PERCENT'
          unit='%'></percent-input>
        
        </input-graphic-layout>
       
    </basic-card>
    
    <basic-card>
        <page-section-title>Calculated Bed Properties</page-section-title>
        <page-section-description>
            The ingredients used in the coating effect the density of the dispersion and film.
            Therefore using large amounts of dense ingredients like talc and titanium dioxide 
            change the optimal coating amount and the dispersion preperation.
        </page-section-description>
          <title-detail-layout>
          
            <page-section-subtitle slot='title'>Dimensions</page-section-subtitle>
        
          <length-text label='Depth' path='batch.batchFillHeight' unit='in'></length-text>
          <length-text label='Width' path='batch.batchFillWidth' unit='in'></length-text>
          <length-text label='Length' path='batch.batchFillLength' unit='in'></length-text>
        
        
        </title-detail-layout>
       
    </basic-card>
    
    
    <page-button-layout>
        <last-page-button page='#coating-amount'>Coating Amount</last-page-button>
        <next-page-button page='#dispersion'>Coating Dispersion</next-page-button>
    </page-button-layout>


</nav-page-layout>`;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('batch-page', BatchPage);