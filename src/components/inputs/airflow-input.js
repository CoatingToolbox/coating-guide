
import { UnitInput } from './unit-input.js';

class AirflowInput extends UnitInput {
  
  constructor() {
    super();
    this._units = [
            {unit: 'CFM', text: 'CFM', multiplier: 1.699011 },
            {unit: "m3/h", text: 'm3/h', multiplier: 1 },
          ];
    this.unit = 'CFM';
    this._multiplier = 1.699011;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('airflow-input', AirflowInput);