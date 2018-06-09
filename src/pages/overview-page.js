import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';

import '../components/texts/page-main-title.js';
import '../components/texts/page-description.js';
import '../components/texts/page-section-description.js';
import '../components/texts/page-section-title.js';
import '../components/cards/basic-card.js';
import '../components/buttons/large-button.js';


class OverviewPage extends connect(store)(LitElement) {
    static get properties() {
        return {
            _tabletName: String,
            _coatingName: String,
            _panName: String,
        };
    }

    _render({ _tabletName, _coatingName, _panName }) {
        // Template getter must return an instance of HTMLTemplateElement.
        // The html helper function makes this easy.
        return html `
      <style>
        :host {
          display: block;
          padding: 24px 72px;
          background: linear-gradient(to bottom, var(--app-primary-color) 0%,var(--app-primary-color) 400px, var(--background-color) 0%,var(--background-color) 100%);
            --page-width: 900px;
            
        }
        basic-card {
          max-width: calc(var(--page-width) - 64px);
          margin: 0px auto 48px auto;
        }
        page-main-title,
        page-description {
          color: var(--white-color);
          max-width: var(--page-width);
          margin: 0px auto;
        }
        page-main-title {
            margin-top: 32px;
        }
        page-description {
            padding-bottom: 32px;
        }
        .material-layout {
          display: grid;
          grid-template-rows: auto auto;
          grid-template-columns: 1fr auto auto auto;
          grid-gap: 0px 16px;
          min-height: 96px;
        }
        .material-layout + .material-layout {
          border-top: var(--border-line);
        }
        .material-layout .material-label {
          font-size: 18px;
          align-self: end;
          grid-row: 1 / 2;
          grid-column: 1 / 2;
        }
        .material-layout .material-title {
          font-size: 24px;
          color: var(--app-primary-color);
          align-self: start;
          grid-row: 2 / 3;
          grid-column: 1 / 2;
        }
        .material-layout large-button,
        .material-layout a {
          grid-row: 1 / 3;
          align-self: center;
          text-decoration: none;
        }
        
        #parameters-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-auto-rows: 1fr;
          padding-top: 16px;
        }
        .parameter {
          display: flex;
          align-items: center;
          height: 48px;
          max-width: 300px;
          padding: 0px 24px;
          font-size: 16px;
        }
        .parameter-dot {
          width: 12px;
          height: 12px;
          margin: 0px 12px;
          border-radius: 50%;
          background-color: var(--app-primary-color);
        }
        .parameter-label {
          flex-grow: 1;
        }
        
      </style>
      
        <page-main-title>Coating Overview</page-main-title>
        <page-description>
          Let's setup your coating process. Provide information about
          the materials & equipment, than determine optimal conditions
          for coating dispersion, coating amount and batch size. With,
          your process parameters selected finally, review critical coating
          specifications to determine how to improve your process.
        </page-description>
        
        <basic-card>
        
        <page-section-title>Materials & Equipment</page-section-title>
          <page-section-description>
            To get started choose a tablet, coating pan and coating formula
            from the library or design your own.
          </page-section-description>
          
          <div class='material-layout'>
            <div class='material-label'>Coating Substrate</div>
            <div class='material-title'>${_tabletName}</div>
            <a href='/#tablet-library'>
              <large-button>Load</large-button>
            </a>
            <a href='/#tablet'>
              <large-button highlight>Edit</large-button>
            </a>
          </div>
          
          <div class='material-layout'>
            <div class='material-label'>Coating Equipment</div>
            <div class='material-title'>${_panName}</div>
            <a href='/#pan-library'>
              <large-button>Load</large-button>
            </a>
            <a href='/#pan'>
              <large-button highlight>Edit</large-button>
            </a>
          </div>
          
          <div class='material-layout'>
            <div class='material-label'>Coating Formula</div>
            <div class='material-title'>${_coatingName}</div>
            <a href='/#coating-library'>
              <large-button>Load</large-button>
            </a>
            <a href='/#coating'>
              <large-button highlight>Edit</large-button>
            </a>
          </div>
        </basic-card>
        
        
          <basic-card>
        
        <page-section-title>Coating Conditions & Process Parameters</page-section-title>
          <page-section-description>
            Get recommended coating conditions and process parameters and set
              your target values.
          </page-section-description>
            <div id='parameters-layout'>
              <div class='parameter'>
                <div class='parameter-dot'></div>
                <div class='parameter-label'>Dispersion Solids</div>
                <div class='parameter-value'>[[coating.formatted.solids]]</div>
             </div>
              <div class='parameter'>
                <div class='parameter-dot'></div>
                <div class='parameter-label'>Pan Speed</div>
                <div class='parameter-value'>[[parameters.formatted.panSpeed]]</div>
              </div>
              <div class='parameter'>
                <div class='parameter-dot'></div>
                <div class='parameter-label'>Weight Gain</div>
                <div class='parameter-value'>[[coatingAmount.formatted.weightGain]]</div>
             </div>
              <div class='parameter'>
                <div class='parameter-dot'></div>
                <div class='parameter-label'>Product Temperature</div>
                <div class='parameter-value'>[[parameters.formatted.productTemp]]</div>
              </div>
              <div class='parameter'>
                <div class='parameter-dot'></div>
                <div class='parameter-label'>Batch Size</div>
                <div class='parameter-value'>[[batch.formatted.batchWeight]]</div>
              </div>
              <div class='parameter'>
                <div class='parameter-dot'></div>
                <div class='parameter-label'>Spray Rate</div>
                <div class='parameter-value'>[[parameters.formatted.sprayRate]]</div>
             </div>
              <div class='parameter'>
                <div class='parameter-dot'></div>
                <div class='parameter-label'>Airflow</div>
                <div class='parameter-value'>[[parameters.formatted.airflow]]</div>
              </div>
              <div class='parameter'>
                <div class='parameter-dot'></div>
                <div class='parameter-label'>+6 More Parameters</div>
                <div class='parameter-value'></div>
             </div>
            </div>
          </basic-card>
      
    `;
    }

    _stateChanged(state) {
        this._tabletName = (state.tablet.productName) ? state.tablet.productName : 'None Selected';
        this._panName = (state.pan.manufacturerName || state.pan.modelName) ? `${state.pan.manufacturerName} ${state.pan.modelName}` : 'None Selected';
        this._coatingName = (state.coating.productName) ? state.coating.productName : 'None Selected';
    }

}

// Register the element with the browser.
/* global customElements */
customElements.define('overview-page', OverviewPage);
