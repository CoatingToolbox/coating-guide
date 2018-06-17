
import { UnitText } from './unit-text.js';

class PercentText extends UnitText {
  
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
customElements.define('percent-text', PercentText);