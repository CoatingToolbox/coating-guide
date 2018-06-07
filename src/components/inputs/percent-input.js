
import { UnitInput } from './unit-input.js';

class PercentInput extends UnitInput {
  
  constructor() {
    super();
    this._units = [
            {unit: "%", text: '%', multiplier:  0.01}
          ];
    this.unit = '%';
    this._multiplier = 0.01;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('percent-input', PercentInput);