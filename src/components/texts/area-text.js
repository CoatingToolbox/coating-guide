
import { UnitText } from './unit-text.js';

class AreaText extends UnitText {
  
  constructor() {
    super();
    this._units = [
            {unit: "um2", text: 'um2', multiplier:  1e-12},
            {unit: "mm2", text: 'mm2', multiplier:  1e-6},
            {unit: "cm2", text: 'cm2', multiplier: 1e-4},
            {unit: "in2", text: 'in2', multiplier: 0.00064516},
          ];
    this.unit = 'cm2';
    this._multiplier = 1e-4;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('area-text', AreaText);