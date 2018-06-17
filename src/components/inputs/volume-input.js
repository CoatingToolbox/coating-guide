
import { UnitInput } from './unit-input.js';

class VolumeInput extends UnitInput {
  
  constructor() {
    super();
    this._units = [
            {unit: "ml", text: 'ml', multiplier: 1e-6},
            {unit: "l", text: 'l', multiplier: 0.001},
            {unit: "cm3", text: 'cm3', multiplier: 1e-6},
            {unit: "um3", text: 'um3', multiplier:  1e-18},
            {unit: "mm3", text: 'mm3', multiplier:  1e-9},
            {unit: "cm3", text: 'cm3', multiplier: 1e-6},
            {unit: "in3", text: 'in3', multiplier: 1.63871e-5},
          ];
    this.unit = 'cm3';
    this._multiplier = 1e-9;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('volume-input', VolumeInput);