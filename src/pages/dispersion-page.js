
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


class DispersionPage extends connect(store)(PageViewElement) {
     
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

    <page-main-title slot='title'>Coating Dispersion</page-main-title>

    
  <basic-card>
          
          <page-section-title>Materials & Equipment</page-section-title>
          
          <page-section-description>
            The amount of coating to apply is based on the tablet core and coating formula.
            The following are important properties of each to consider as we determine the
            optimal coating amount.
          </page-section-description>
          
          <title-detail-layout>
          
            <page-section-subtitle slot='title'>Tablet Core</page-section-subtitle>
    
    
          </title-detail-layout>
          
          
          
          <title-detail-layout>
            <page-section-subtitle slot='title'>Coating Formula</page-section-subtitle>
        
          </title-detail-layout>
          
          </basic-card>
          
    <basic-card>
        <page-section-title>Dispersion Solids</page-section-title>
        <page-section-description>
            The ingredients used in the coating effect the density of the dispersion and film.
            Therefore using large amounts of dense ingredients like talc and titanium dioxide 
            change the optimal coating amount and the dispersion preperation.
        </page-section-description>
        <input-graphic-layout>
        
        </input-graphic-layout>
       
    </basic-card>
    
    <basic-card>
        <page-section-title>Materials</page-section-title>
        <page-section-description>
            The ingredients used in the coating effect the density of the dispersion and film.
            Therefore using large amounts of dense ingredients like talc and titanium dioxide 
            change the optimal coating amount and the dispersion preperation.
        </page-section-description>
        <input-graphic-layout>
        
        </input-graphic-layout>
       
    </basic-card>
    
    <basic-card>
        <page-section-title>Vessel & Blade</page-section-title>
        <page-section-description>
            The ingredients used in the coating effect the density of the dispersion and film.
            Therefore using large amounts of dense ingredients like talc and titanium dioxide 
            change the optimal coating amount and the dispersion preperation.
        </page-section-description>
        <input-graphic-layout>
        
        </input-graphic-layout>
       
    </basic-card>
    
    <basic-card>
        <page-section-title>Mixing Procedure</page-section-title>
        <page-section-description>
            The ingredients used in the coating effect the density of the dispersion and film.
            Therefore using large amounts of dense ingredients like talc and titanium dioxide 
            change the optimal coating amount and the dispersion preperation.
        </page-section-description>
        <input-graphic-layout>
        
        </input-graphic-layout>
       
    </basic-card>
    
    
    <page-button-layout>
        <last-page-button page='#batch'>Batch Size</last-page-button>
        <next-page-button page='#parameters'>Process Parameters</next-page-button>
    </page-button-layout>


</nav-page-layout>`;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('dispersion-page', DispersionPage);