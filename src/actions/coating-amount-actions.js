export class CoatingAmount {

    constructor(parameters = {}) {
        this.filmDensity = 0;
        this.weightGain = 0.03;
        this.percentTio2 = 0;
        // TABLET PROPERTIES
        this.tabletWeight = 0;
        this.tabletArea = 0;

        // Set the properties that match the class
        Object.getOwnPropertyNames(this).map(name => {
            if (!parameters[name]) { return }
            this[name] = parameters[name];
        });

        Object.defineProperties(this, {
            coatingWeight: {
                get: () => {
                    return this.tabletWeight * this.weightGain;
                },
                set: (val) => {
                    this.weightGain = val / this.tabletWeight;
                },
                enumerable: true
            },
            filmThickness: {
                get: () => {
                    // (grams / meters^2) / (grams / meters^3) = meters
                    return this.coatingCoverage / this.filmDensity;
                },
                set: (val) => {
                    this.coatingCoverage = val * this.filmDensity;
                },
                enumerable: true
            },
            coatingCoverage: {
                get: () => {
                    // grams * percent / meters^2 = grams / meters^2
                    return this.coatingWeight / this.tabletArea;
                },
                set: (val) => {
                    this.coatingWeight = val * this.tabletArea;
                },
                enumerable: true
            },
            filmOpacity: {
                get: () => {
                    // x = tio2 mg/cm2
                    // y = 17.406ln(x) + 81.454
                    let x = this.weightGain * (this.tabletWeight * 1000) * this.percentTio2 / (this.tabletArea * 10000);
                    let opacity = (17.406 * Math.log(x) + 81.454) / 100;
                    return (opacity && opacity > 0) ? opacity : 0;
                },
                set: (value) => {
                    // x = tio2 mg/cm2
                    // y = 17.406ln(x) + 81.454
                    let x = Math.exp((value * 100 - 81.454) / 17.406) ;
                    this.weightGain = x / (this.tabletWeight * 1000) / this.tio2 * (this.tabletArea * 10000);
                },
                enumerable: true
            }
        });
    }
}
