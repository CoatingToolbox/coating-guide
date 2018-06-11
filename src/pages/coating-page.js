import { LitElement, html } from '@polymer/lit-element';
import { productIcon, densityIcon, volumeIcon } from '../components/app-icons.js';

import '../components/cards/basic-card.js';
import '../components/layouts/nav-page-layout.js';
import '../components/layouts/title-detail-layout.js';
import '../components/layouts/input-graphic-layout.js';
import '../components/layouts/two-column-input-layout.js';
import '../components/layouts/page-button-layout.js';
import '../components/buttons/next-page-button.js';
import '../components/buttons/last-page-button.js';
import '../components/texts/page-main-title.js';
import '../components/texts/page-description.js';
import '../components/texts/page-section-title.js';
import '../components/texts/page-section-description.js';
import '../components/texts/page-section-subtitle.js';
import '../components/inputs/text-input.js';
import '../components/inputs/dropdown-input.js';
import '../components/inputs/density-input.js';
import '../components/inputs/percent-input.js';
import '../components/inputs/number-input.js';
import '../components/charts/coating-density-chart.js';
import '../components/charts/coating-viscosity-chart.js';
import '../components/charts/coating-opacity-chart.js';

const coatingTypeOptions = ["", "Immediate Release", "Extended Release", "Delayed Release"];
const colorOptions = ['', 'Beige', 'Black', 'Blue', 'Brown', 'Clear', 'Green', 'Orange', 'Purple', 'Red', 'White', 'Yellow'];

class CoatingPage extends LitElement {
  _colorChanged(color) {
      switch(color) {
            case 'Clear':
            case 'clear':
                this.shadowRoot.querySelector('#opacity-card').setAttribute('hidden', '');
                break;
            default: 
                this.shadowRoot.querySelector('#opacity-card').removeAttribute('hidden');
                break;
      }
  }
  _render({ }) {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
    <style>
    :host {
        display: block;
    }

    basic-card+basic-card {
        margin-top: 48px;
    }
    ul {
      max-width: 600px;
      margin: 16px auto 0px auto;
    }
    .equation {
        padding: 24px 48px;
        text-align: center;
        font-weight: bold;
    }
    [hidden] {
        display: none !important;
    }
</style>

<nav-page-layout>

    <page-main-title slot='title'>Coating Formulation</page-main-title>

    <basic-card>
        <page-section-title>General Information</page-section-title>
        <page-section-description>
            For reference provide a description of the coating formulations.
        </page-section-description>
        <two-column-input-layout>
            <page-section-subtitle title>${ productIcon } Product Description</page-section-subtitle>
            <text-input label='Product Name' path='coating.productName' action='SET_COATING_PRODUCT_NAME'>
            </text-input>
            <text-input label='Formula' path='coating.formulaName' action='SET_COATING_FORMULA_NAME'>
            </text-input>
            <dropdown-input 
                label='Color' 
                path='coating.color' 
                action='SET_COATING_COLOR' 
                options='${ colorOptions }'
                on-selected-changed='${(e) => this._colorChanged(e.detail.value)}'></dropdown-input>
            <dropdown-input label='Release Type' path='coating.releaseType' action='SET_COATING_RELEASE_TYPE' options='${ coatingTypeOptions }'>
            </dropdown-input>
        </two-column-input-layout>
    </basic-card>

    <basic-card>
        <page-section-title>Density</page-section-title>
        <page-section-description>
            The ingredients used in the coating effect the density of the dispersion and film.
            Therefore using large amounts of dense ingredients like talc and titanium dioxide 
            change the optimal coating amount and the dispersion preperation.
        </page-section-description>
        <input-graphic-layout>
            <density-input label='Density' unit='g/ml' action='SET_COATING_FILM_DENSITY' path='coating.filmDensity'></density-input>
            <coating-density-chart graphic></coating-density-chart>
        </input-graphic-layout>
       
    </basic-card>

    <basic-card id='opacity-card'>
        <page-section-title>Opacity</page-section-title>
        <page-section-description>
            Many film coating formulations include opacifiers like titanium dioxide or
            calcium carbonate. The base formula and the level of opacifier used results 
            in different hiding power. 
        </page-section-description>
        <input-graphic-layout>
            <page-section-subtitle title></page-section-subtitle>
            <percent-input label='Percent TiO2' unit='%' action='SET_COATING_PERCENT_TIO2' path='coating.percentTio2'></percent-input>
            <coating-opacity-chart graphic></coating-opacity-chart>
        </input-graphic-layout>
    </basic-card>


    <basic-card>
        <page-section-title>Viscosity</page-section-title>
        <page-section-description>
            Based on the polymer other other solule ingredients each coating formulation
            has a different viscosity curve but most are explained the exponential function below:
            <div class='equation'> viscosity = <i>e</i><sup>(<i>x</i> * solids)</sup> * <i>b</i></div>
            Provide the intercept and exponent that best desribes the viscosity curve. (Hint: use
            excel to fit an exponential regression curve for accurate values).
        </page-section-description>
        <input-graphic-layout>
            <page-section-subtitle title></page-section-subtitle>
            <number-input label='Intercept (b)' path='coating.viscosityIntercept' action='SET_COATING_VISCOSITY_INTERCEPT'></number-input>
            <number-input label='Exponent (x)' path='coating.viscosityExponent' action='SET_COATING_VISCOSITY_EXPONENT'></number-input>
            <coating-viscosity-chart graphic></coating-viscosity-chart>
        </input-graphic-layout>
    </basic-card>

    <page-button-layout>
        <last-page-button page='#pan'>Coating Equipment</last-page-button>
        <next-page-button page='#batch'>Batch Size</next-page-button>
    </page-button-layout>


</nav-page-layout>`;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('coating-page', CoatingPage);