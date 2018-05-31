import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';

import '../components/page-elements/page-header.js';
import '../components/page-elements/page-section.js';
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

    // _displayAsPercent(value) {
    //   let percent = (value * 100).toFixed(1);
    //   return `${percent}%`;
    // }
    // _displayAsKilo(value) {
    //   let kg = (value / 1000).toFixed(1);
    //   return `${kg} kg`;
    // }

    _render({ _tabletName, _coatingName, _panName }) {
        // Template getter must return an instance of HTMLTemplateElement.
        // The html helper function makes this easy.
        return html `
      <style>
        :host {
          display: block;
          max-width: 900px;
          margin: auto;
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
      
        <page-header>
          <div slot='title'>Let's setup your coating process.</div>
          <p slot='description'>
            Use the Colorcon Coating Guide to get recommendations on coating conditions and process
            parameters. Or audit your coating process with key coating metrics.
          </p>
        </page-header>
        
        <page-section>
          <div slot='title'>Materials & Equipment</div>
          <p slot='description'>
            To get started choose a tablet, coating pan and coating formula
            from the library or design your own.
          </p>
        </page-section>
      
        <basic-card>
          
          <div class='material-layout'>
            <div class='material-label'>Coating Substrate</div>
            <div class='material-title'>${_tabletName}</div>
            <a href='/tablet-library'>
              <large-button label='Load'></large-button>
            </a>
            <a href='/tablet'>
              <large-button label='Explore'></large-button>
            </a>
          </div>
          
          <div class='material-layout'>
            <div class='material-label'>Coating Pan</div>
            <div class='material-title'>${_panName}</div>
            <a href='/pan-library'>
              <large-button label='Load'></large-button>
            </a>
            <a href='/pan'>
              <large-button label='Explore'></large-button>
            </a>
          </div>
          
          <div class='material-layout'>
            <div class='material-label'>Coating Formula</div>
            <div class='material-title'>${_coatingName}</div>
            <a href='/coating-library'>
              <large-button label='Load'></large-button>
            </a>
            <a href='/coating'>
              <large-button label='Explore'></large-button>
            </a>
          </div>
        </basic-card>
          
      
        
        <page-section>
          <div slot='title'>Coating Conditions & Process Parameter</div>
          <p slot='description'>
            Get recommended coating conditions and process parameters and set
              your target values.
          </p>
            <large-button slot='button' label='Edit'></large-button>
        </page-section>
        
        
          <basic-card>
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
