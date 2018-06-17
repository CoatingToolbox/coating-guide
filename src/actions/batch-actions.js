import { Pan } from './pan-actions.js';

export class Batch extends Pan {

  constructor(parameters = {}) {
    super();
    this.batchWeight = 120000;
    this.bulkDensity = 760000;
    this.tabletWeight = 0.4;

    Object.getOwnPropertyNames(this).map(prop => {
      if (!parameters[prop]) { return }
      this[prop] = parameters[prop];
    });

    Object.defineProperties(this, {
      batchVolume: {
        get: () => {
          return this.batchWeight / this.bulkDensity;
        },
        set: (value) => {
          this.batchWeight = value * this.bulkDensity;
        },
        enumerable: true
      },
      tabletCount: {
        get: () => {
          return Math.ceil(this.batchWeight / this.tabletWeight);
        },
        set: (value) => {
          this.batchWeight = value * this.tabletWeight;
        },
        enumerable: true
      },
      brimWeight: {
        get: () => {
          return this.calcWeight(this.brimVolume, this.bulkDensity);
        },
        enumerable: true
      },
      maxFillWeight: {
        get: () => {
          return this.calcWeight(this.maxFillVolume, this.bulkDensity);
        },
        enumerable: true
      },
      minFillWeight: {
        get: () => {
          return this.calcWeight(this.minFillVolume, this.bulkDensity);
        },
        enumerable: true
      },
      batchFillHeight: {
        get: () => {
          //we estimate the heigh that will match our fill volume
          let saggita = 0;
          let step = this.brimHeight / 750;
          for (let i = 0; i <= this.brimHeight; i = i + step) {
            saggita = this.brimHeight - i;
            let volume = this.calcVolume(saggita);
            if (volume <= this.batchVolume) {
              break;
            }
          }
          return saggita;
        },
        enumerable: true
      },
      batchFillWidth: {
        get: () => {
          return this.wallWidth + 2 * this.batchFillHeight / this.sideWallSlope;
        },
        set: (value) => {
          return;
        },
        enumerable: true
      },
      batchFillLength: {
        get: () => {
          return this.calcChordLength(this.batchFillHeight);
        },
        enumerable: true
      },
      batchFillVolumePercent: {
        get: () => {
          return this.batchVolume / this.brimVolume;
        },
        set: (value) => {
          this.batchVolume = value * this.brimVolume;
        },
        enumerable: true
      },
    });
  }
  
  calcWeight(volume, density) {
    return volume * density;
  }

}
