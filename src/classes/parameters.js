
export class Parameters {

        constructor(parameters={}) {
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
                if(!parameters[name]) { return }
                this[name] = parameters[name];
            });
        }
        
        get linearVelocity() {
            // return meters per minute
            return Math.PI * this.panDiameter * this.panSpeedRPM;
        }
        set linearVelocity(value) {
            this.panSpeedRPM = value / (Math.PI * this.panDiameter);
        }
        
        get linearVelocityFPM() {
            return this.linearVelocity * 3.28084;
        }
        get velocityVsSpeedData() {
            // pan speed in rpm vs linear velocity in fpm
            let vals = [];
            for(let i = 5; i <= 125; i = i + 5) {
                vals.push({
                    linearVelocityFPM: i,
                    speedRPM: i / (Math.PI * this.panDiameter * 3.28084)
                });
            }
            return vals;
        }
        toJSON() {
            return Object.assign({}, this, 
                {
                    charts: 
                    {
                        velocityVsSpeedData: this.velocityVsSpeedData,
                    },
                    formatted: 
                    {
                       panSpeed: `${(this.panSpeedRPM).toFixed(1)} rpm` ,
                       linearVelocity: `${(this.linearVelocity * 3.28084).toFixed(2)} fpm`,
                       productTemp: `${(this.productTemp).toFixed(0)} \u{02103}`,
                       sprayRate: `${(this.sprayRate).toFixed(0)} g/min`,
                       airflow: `${(this.airflow).toFixed(0)} cfm`
                    }
                }
            );
        }
    }