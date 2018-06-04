
import { UnitText } from './unit-text.js';

class DensityText extends UnitText {
  
  constructor() {
    super();
    this._units = [
            {unit: "mg/ml", text: 'mg/ml', multiplier:  1000},
            {unit: "g/ml", text: 'g/ml', multiplier:  1e+6},
            {unit: "kg/l", text: 'kg/l', multiplier: 1e+6}
          ];
    this.unit = 'g/ml';
    this._multiplier = 1e+6;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('density-text', DensityText);