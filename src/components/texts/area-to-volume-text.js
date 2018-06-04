
import { html } from '@polymer/lit-element';
import { UnitText } from './unit-text.js';

class AreaToVolumeText extends UnitText {
  
  constructor() {
    super();
    this._units = [
            {unit: "um-1", text: html`&#181;m<sup>-1</sup>`, multiplier:  1/1e-6},
            {unit: "mm-1", text: html`mm<sup>-1</sup>`, multiplier:  1/0.001},
            {unit: "cm-1", text: html`cm<sup>-1</sup>`, multiplier: 1/0.01},
            {unit: "m-1", text: html`m<sup>-1</sup>`, multiplier: 1},
            {unit: "km-1", text: html`km<sup>-1</sup>`, multiplier: 1/1000},
            {unit: "in-1", text: html`in<sup>-1</sup>`, multiplier: 1/0.0254},
            {unit: "ft-1", text: html`ft<sup>-1</sup>`, multiplier: 1/0.3408},
          ];
    this.unit = 'cm-1';
    this._multiplier = 1/0.01;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('area-to-volume-text', AreaToVolumeText);