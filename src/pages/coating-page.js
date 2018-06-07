import { LitElement, html } from '@polymer/lit-element';
import { productIcon } from '../components/app-icons.js';

import '../components/cards/basic-card.js';
import '../components/layouts/nav-page-layout.js';
import '../components/layouts/title-detail-layout.js';
import '../components/layouts/input-graphic-layout.js';
import '../components/layouts/two-column-input-layout.js';
import '../components/layouts/page-button-layout.js';
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

const coatingTypeOptions = ["", "Immediate Release", "Extended Release", "Delayed Release"];

class CoatingPage extends LitElement {
  
  static get properties() {
    return {
      
    };
  }
  
  constructor() {
    super();
  }
  _render({ lengthUnits }) {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`<style>
    :host {
        display: block;
    }

    basic-card+basic-card {
        margin-top: 48px;
    }
</style>

<nav-page-layout>

    <page-main-title slot='title'>Design your coating formula.</page-main-title>
    <page-description slot='title'>
        Coating pans come in different makes and models and each of these can be customized with different baffles, gun setup and airhanders. Provide some info below so we can make recommendations on batch size, process parameters and more.
    </page-description>

    <basic-card>
        <page-section-title>General Information</page-section-title>
        <page-section-description>
            For reference provide a description of the coating formulations.
        </page-section-description>
        <two-column-input-layout>
            <page-section-subtitle title>Product Description</page-section-subtitle>
            <text-input label='Product Name' path='coating.productName' action='SET_COATING_PRODUCT_NAME'>
            </text-input>
            <text-input label='Formula' path='coating.formulaName' action='SET_COATING_FORMULA_NAME'>
            </text-input>
            <text-input label='Color' path='coating.color' action='SET_COATING_COLOR'>
            </text-input>
            <dropdown-input label='Release Type' path='coating.releaseType' action='SET_COATING_RELEASE_TYPE' options='${ coatingTypeOptions }'>
            </dropdown-input>
        </two-column-input-layout>
    </basic-card>

    <basic-card>
        <page-section-title>Film Properties</page-section-title>
        <page-section-description></page-section-description>

        <input-graphic-layout>
            <page-section-subtitle title>Film Density</page-section-subtitle>
            <density-input label='Film Density' unit='g/ml' action='SET_COATING_FILM_DENSITY' path='coating.filmDensity'></density-input>
        </input-graphic-layout>
        <input-graphic-layout>
            <page-section-subtitle title>Opacity</page-section-subtitle>
            <percent-input label='Opacity' unit='%' action='SET_COATING_OPACITY' path='coating.opacity'></percent-input>
        </input-graphic-layout>
    </basic-card>


    <basic-card>
        <page-section-title>Dispersion</page-section-title>
        <page-section-description></page-section-description>

        <input-graphic-layout>
            <page-section-subtitle title>Viscosity</page-section-subtitle>
            <number-input label='Viscosity Curve Intercept' path='coating.viscosityIntercept' action='SET_COATING_VISCOSITY_INTERCEPT'></number-input>
            <number-input label='Viscosity Curve Exponent' path='coating.viscosityExponent' action='SET_COATING_VISCOSITY_EXPONENT'></number-input>
        </input-graphic-layout>
    </basic-card>

    <page-button-layout>
        <last-page-button page='#pan'>Coating Equipment</last-page-button>
        <next-page-button page='#batch'>Batch Size</next-page-button>
    </page-button-layout>


</nav-page-layout>

    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('coating-page', CoatingPage);