
export const UPDATE_COATING = "UPDATE_COATING";

export class Coating {

        constructor(parameters={}) {
            this.recommendedSolids = 0.2;
            this.recommendedWG = 0.03;
            this.recommendProductTemp = 47;
            this.solids = 0.2;
            this.viscosityIntercept = 20;
            this.viscosityExponent = 10;
            this.filmDensity = 1100000;
            this.filmOpacity = 1;
            
            this.productName = 'Opadry II';
            this.formulaName = '85F18422';
            this.color = 'White';
            this.firebaseKey = '';
            
            Object.defineProperties(this, {
                viscosity: {
                    get: () => {
                        return this.viscosityIntercept * Math.exp(this.viscosityExponent * this.solids);
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