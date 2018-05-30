
import { UnitInput } from './unit-input.js';

class DensityInput extends UnitInput {
  
  static get properties() {
    return {
      unit: { type: String, value: 'g/ml' },
      _multiplier: { type: Number, value: 1e+6 },
      _units: { type: Array, value: 
        function() {
          return [
            {unit: "mg/ml", text: 'mg/ml', multiplier:  1000},
            {unit: "g/ml", text: 'g/ml', multiplier:  1e+6},
            {unit: "kg/l", text: 'kg/l', multiplier: 1e+6}
          ];
        }
      }
    };
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('density-input', DensityInput);