
import { UnitInput } from './unit-input.js';

class TensInput extends UnitInput {
  
  constructor() {
    super();
    this._units = [
            {unit: '', text: '', multiplier: 1 },
            {unit: "hundred", text: 'hundred', multiplier: 100 },
            {unit: "thousand", text: 'thousand', multiplier: 1000 },,
          ];
    this.unit = '';
    this._multiplier = 1;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tens-input', TensInput);