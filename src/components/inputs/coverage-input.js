
import { UnitInput } from './unit-input.js';

class CoverageInput extends UnitInput {
  
  constructor() {
    super();
    this._units = [
            {unit: "mg/cm2", text: 'mg/cm2', multiplier: 10 }
          ];
    this.unit = 'mg/cm2';
    this._multiplier = 1000;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('coverage-input', CoverageInput);