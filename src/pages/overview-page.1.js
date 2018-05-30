
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '../components/page-elements/page-header.js';
import '../components/card/card-with-toolbar.js';
import '../components/card/card-button.js';


class OverviewPage extends PolymerElement {
  static get properties () {
    return {
      tablet: {type: Object, statePath: 'tablet'},
      pan: {type: Object, statePath: 'pan'},
      parameters: {type: Object, statePath: "parameters"},
      coatingAmount: {type: Object, statePath: "coatingAmount"},
      coating: {type: Object, statePath: "coating"},
      batch: {type: Object, statePath: 'batch'},
      user: {type: Object, statePath: 'app.user'}
    };
  }

  _displayAsPercent(value) {
    let percent = (value * 100).toFixed(1);
    return `${percent}%`;
  }
  _displayAsKilo(value) {
    let kg = (value / 1000).toFixed(1);
    return `${kg} kg`;
  }
  
  static get template () {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: block;
          max-width: var(--page-width);
          margin: auto;
        }
        #materials-section .material-layout {
          display: grid;
          grid-template-rows: auto auto;
          grid-template-columns: 1fr auto auto auto;
          grid-gap: 0px 16px;
          min-height: 96px;
        }
        #materials-section .material-layout:first-of-type {
          margin-top: 24px;
        }
        #materials-section .material-layout + .material-layout {
          border-top: var(--border-line);
        }
        #materials-section .material-layout .material-label {
          font-size: 18px;
          align-self: end;
          grid-row: 1 / 2;
          grid-column: 1 / 2;
        }
        #materials-section .material-layout .material-title {
          font-size: 24px;
          color: var(--app-primary-color);
          align-self: start;
          grid-row: 2 / 3;
          grid-column: 1 / 2;
        }
        #materials-section .material-layout card-button,
        #materials-section .material-layout a {
          grid-row: 1 / 3;
          align-self: center;
        }
        
        #parameters-section {
          
        }
        #parameters-section #parameters-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-auto-rows: 1fr;
          padding-top: 16px;
        }
        #parameters-section .parameter {
          display: flex;
          align-items: center;
          height: 48px;
          max-width: 300px;
          padding: 0px 24px;
          font-size: 16px;
        }
        #parameters-section .parameter-dot {
          width: 12px;
          height: 12px;
          margin: 0px 12px;
          border-radius: 50%;
          background-color: var(--app-primary-color);
        }
        #parameters-section .parameter-label {
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
        
        <section id='materials-section'>
      
          <card-with-toolbar title='Materials & Equipment'>
            <p slot='card-description'>
              To get started choose a tablet, coating pan and coating formula
              from the library or design your own.
            </p>
            
            <div class='material-layout'>
              <div class='material-label'>Coating Substrate</div>
              <div class='material-title'>[[tablet.productName]]</div>
              <a href='#/tablet-overview'>
                <card-button label='Info'></card-button>
              </a>
              <a href='#/tablet-designer'>
                <card-button label='Edit'></card-button>
              </a>
              <a href='#/tablet-library'>
                <card-button label='Load'></card-button>
              </a>
            </div>
            
            <div class='material-layout'>
              <div class='material-label'>Coating Pan</div>
              <div class='material-title'>[[pan.nickname]]</div>
              <a href='#/pan-overview'>
                <card-button label='Info'></card-button>
              </a>
              <a href='#/pan-designer'>
                <card-button label='Edit'></card-button>
              </a>
              <a href='#/pan-library'>
                <card-button label='Load'></card-button>
              </a>
            </div>
            
            <div class='material-layout'>
              <div class='material-label'>Coating Formula</div>
              <div class='material-title'>[[coating.productName]]</div>
              <a href='#/coating-overview'>
                <card-button label='Info'></card-button>
              </a>
              <a href='#/coating-designer'>
                <card-button label='Edit'></card-button>
              </a>
              <a href='#/coating-library'>
                <card-button label='Load'></card-button>
              </a>
            </div>
          </card-with-toolbar>
        </section>
        
        <section id='parameters-section'>
      
          <card-with-toolbar title='Coating Conditions & Process Parameters'>
            <card-button slot='toolbar' label='Edit'></card-button>
            <p slot='card-description'>
              Get recommended coating conditions and process parameters and set
              your target values.
            </p>
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
          </card-with-toolbar>
        </section>
      
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('overview-page', OverviewPage);