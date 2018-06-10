export class Coating {

    constructor(parameters = {}) {
        this.solids = 0.2;
        this.viscosityIntercept = 20;
        this.viscosityExponent = 10;
        this.filmDensity = 2200000;
        this.filmOpacity = 0;

        this.productName = 'Opadry II';
        this.formulaName = '85F18422';
        this.color = 'White';
        this.releaseType = 'Immediate Release';

        Object.defineProperties(this, {
            viscosity: {
                get: () => {
                    return this.viscosityIntercept * Math.exp(this.viscosityExponent * this.solids);
                },
                set: (value) => {
                    this.solids = Math.log(value / this.viscosityIntercept) / this.viscosityExponent;
                },
                enumerable: true
            }
        });

        // Set the properties that match the class
        Object.getOwnPropertyNames(this).map(name => {
            if (!parameters[name]) { return }
            this[name] = parameters[name];
        });
    }
}

export const COATING_LIBRARY = [{
        "color": "Clear",
        "filmDensity": 1100000,
        "formulaName": "20A19286",
        "productName": "Opadry 20A Series",
        "solids": 0.075,
        "releaseType": "Immediate Release",
        "viscosityExponent": 45.66,
        "viscosityIntercept": 8.91242
    },
    {
        "color": "Clear",
        "filmDensity": 1100000,
        "formulaName": "79U19347",
        "productName": "Opadry ns-g 79U Series",
        "solids": 0.075,
        "releaseType": "Immediate Release",
        "viscosityExponent": 41.17,
        "viscosityIntercept": 6.8664
    },
    {
        "color": "Clear",
        "filmDensity": 1100000,
        "formulaName": "06M190000",
        "productName": "Opadry 06M Series",
        "solids": 0.1,
        "releaseType": "Immediate Release",
        "viscosityExponent": 37.02,
        "viscosityIntercept": 6.8809
    },
    {
        "color": "Clear",
        "filmDensity": 1100000,
        "formulaName": "101M190000",
        "productName": "Opadry NS 101M Series",
        "solids": 0.1,
        "releaseType": "Immediate Release",
        "viscosityExponent": 34.37,
        "viscosityIntercept": 6.5929
    },
    {
        "color": "Clear",
        "filmDensity": 1100000,
        "formulaName": "47U19263",
        "productName": "Opadry II 47U Series",
        "solids": 0.1,
        "releaseType": "Immediate Release",
        "viscosityExponent": 28.88,
        "viscosityIntercept": 4.8946
    },
    {
        "color": "Clear",
        "filmDensity": 1100000,
        "formulaName": "140A190012",
        "productName": "Opadry NutraPure",
        "solids": 0.1,
        "releaseType": "Immediate Release",
        "viscosityExponent": 20.28,
        "viscosityIntercept": 10.043
    },
    {
        "color": "Clear",
        "filmDensity": 1100000,
        "formulaName": "85F19999",
        "productName": "Opadry II 85F Series",
        "solids": 0.1,
        "releaseType": "Immediate Release",
        "viscosityExponent": 16.36,
        "viscosityIntercept": 3.4653
    }
];
