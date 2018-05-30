export class Parameters {

    constructor(parameters = {}) {
        this.panDiameter = 1;
        this.panSpeedRPM = 5;
        this.atomizationAir = 45;
        this.patternAir = 45;
        this.sprayPatternWidth = 0.1778;
        this.sprayRate = 350;
        this.sprayRatePerGun = 100;
        this.airflow = 1800;
        this.gunToBed = 0.2032;
        this.productTemp = 48;
        this.exhaustTemp = 50;
        this.inletTemp = 68;

        // Set the properties that match the class
        Object.getOwnPropertyNames(this).map(name => {
            if (!parameters[name]) { return }
            this[name] = parameters[name];
        });

        Object.defineProperties(this, {
            linearVelocity: {
                get: () => {
                    // return meters per minute
                    return Math.PI * this.panDiameter * this.panSpeedRPM;
                },
                set: (value) => {
                    this.panSpeedRPM = value / (Math.PI * this.panDiameter);
                },
                enumerable: true
            }
        });
    }
}


// get velocityVsSpeedData() {
//     // pan speed in rpm vs linear velocity in fpm
//     let vals = [];
//     for(let i = 5; i <= 125; i = i + 5) {
//         vals.push({
//             linearVelocityFPM: i,
//             speedRPM: i / (Math.PI * this.panDiameter * 3.28084)
//         });
//     }
//     return vals;
// }
