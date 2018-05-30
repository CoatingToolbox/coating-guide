
import { UnitInput } from './unit-input.js';

class MassInput extends UnitInput {
  
  static get properties() {
    return {
      unit: { type: String, value: 'mg' },
      _multiplier: { type: Number, value: 0.001 },
      _units: { type: Array, value: 
        function() {
          return [
            {unit: "mg", text: 'mg', multiplier: 0.001 },
            {unit: "g", text: 'g', multiplier: 1 },
            {unit: "kg", text: 'kg', multiplier: 1000 },
            {unit: "oz", text: 'oz', multiplier: 28.3495 },
            {unit: "lb", text: 'lb', multiplier: 453.592 },
          ];
        }
      }
    };
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('mass-input', MassInput);