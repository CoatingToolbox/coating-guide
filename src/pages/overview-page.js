
import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';

import '../components/texts/page-main-title.js';
import '../components/texts/page-description.js';
import '../components/texts/page-section-description.js';
import '../components/texts/page-section-title.js';
import '../components/cards/basic-card.js';
import '../components/buttons/large-button.js';


class OverviewPage extends connect(store)(PageViewElement) {
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
        background: linear-gradient(to bottom, var(--app-primary-color) 0%, var(--app-primary-color) 400px, var(--background-color) 0%, var(--background-color) 100%);
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

    .material-layout+.material-layout {
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
</style>

<page-main-title>Coating Overview</page-main-title>
<page-description>
    Let's setup your coating process. Provide information about the materials & equipment, than determine optimal conditions for coating dispersion, coating amount and batch size. With, your process parameters selected finally, review critical coating specifications
    to determine how to improve your process.
</page-description>

<basic-card>

    <page-section-title>Materials & Equipment</page-section-title>
    <page-section-description>
        To get started choose a tablet, coating pan and coating formula from the library or design your own.
    </page-section-description>

    <div class='material-layout'>
        <div class='material-label'>Coating Substrate</div>
        <div class='material-title'>${_tabletName}</div>
        <a href='/#tablet'>
            <large-button>Edit</large-button>
        </a>
        <a href='/#tablet-library'>
            <large-button>Load</large-button>
        </a>
    </div>

    <div class='material-layout'>
        <div class='material-label'>Coating Equipment</div>
        <div class='material-title'>${_panName}</div>
        <a href='/#pan'>
            <large-button>Edit</large-button>
        </a>
        <a href='/#pan-library'>
            <large-button>Load</large-button>
        </a>
    </div>

    <div class='material-layout'>
        <div class='material-label'>Coating Formula</div>
        <div class='material-title'>${_coatingName}</div>
        <a href='/#coating'>
            <large-button>Edit</large-button>
        </a>
        <a href='/#coating-library'>
            <large-button>Load</large-button>
        </a>
    </div>
</basic-card>


<basic-card>

    <page-section-title>Trial Setup</page-section-title>
    <page-section-description>
        To get started choose a tablet, coating pan and coating formula from the library or design your own.
    </page-section-description>

    <div class='material-layout'>
        <div class='material-label'>Coating Amount</div>
        <div class='material-title'>3.0% weight gain</div>
        <a href='/#coating-amount'>
            <large-button>Edit</large-button>
        </a>
    </div>

    <div class='material-layout'>
        <div class='material-label'>Batch Size</div>
        <div class='material-title'>145.6 kg</div>
        <a href='/#batch'>
            <large-button>Edit</large-button>
        </a>
    </div>

    <div class='material-layout'>
        <div class='material-label'>Coating Dispersion</div>
        <div class='material-title'>20.0% solids</div>
        <a href='/#dispersion'>
            <large-button>Edit</large-button>
        </a>
    </div>
</basic-card>

    `;
    }

    _stateChanged(state) {
        this._tabletName = (state.tablet.productName) ? state.tablet.productName : 'None Selected';
        this._panName = state.pan.nickname ? state.pan.nickname : 'None Selected';
        this._coatingName = (state.coating.productName) ? state.coating.productName : 'None Selected';
    }

}

// Register the element with the browser.
/* global customElements */
customElements.define('overview-page', OverviewPage);
