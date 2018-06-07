
export const UPDATE_COATING = "UPDATE_COATING";

export class Coating {

        constructor(parameters={}) {
            this.solids = 0.2;
            this.viscosityIntercept = 20;
            this.viscosityExponent = 10;
            this.filmDensity = 1100000;
            this.filmOpacity = 1;
            
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
                if(!parameters[name]) { return }
                this[name] = parameters[name];
            });
        }
}