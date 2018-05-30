export class CoatingAmount {

    constructor(parameters = {}) {
        this.filmDensity = 1100000;
        this.weightGain = 0.03;
        // TABLET PROPERTIES
        this.tabletWeight = 0.4;
        this.tabletArea = 0.01;

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
        });
    }
}
