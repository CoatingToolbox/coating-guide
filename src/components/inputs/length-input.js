
import { UnitInput } from './unit-input.js';

class LengthInput extends UnitInput {
  
  constructor() {
    super();
    this._units = [
            {unit: "um", text: 'um', multiplier: 1e-6 },
            {unit: "mm", text: 'mm', multiplier: 0.001 },
            {unit: "cm", text: 'cm', multiplier: 0.01 },
            {unit: "m", text: 'm', multiplier: 1 },
            {unit: "in", text: 'in', multiplier: 0.0254 },
            {unit: "ft", text: 'ft', multiplier: 0.3048 }
          ];
    this.unit = 'mm';
    this._multiplier = 0.001;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('length-input', LengthInput);