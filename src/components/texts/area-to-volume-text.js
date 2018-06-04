
import { UnitText } from './unit-text.js';

class AreaToVolumeText extends UnitText {
  
  constructor() {
    super();
    this._units = [
            {unit: "um-1", text: 'um-1', multiplier:  1/1e-6},
            {unit: "mm-1", text: 'mm-1', multiplier:  1/0.001},
            {unit: "cm-1", text: 'cm-1', multiplier: 1/0.01},
            {unit: "m-1", text: 'm-1', multiplier: 1},
            {unit: "km-1", text: 'km-1', multiplier: 1/1000},
            {unit: "in-1", text: 'in-1', multiplier: 1/0.0254},
            {unit: "ft-1", text: 'ft-1', multiplier: 1/0.3408},
          ];
    this.unit = 'cm-1';
    this._multiplier = 1/0.01;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('area-to-volume-text', AreaToVolumeText);