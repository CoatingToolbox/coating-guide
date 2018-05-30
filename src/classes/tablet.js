
export class Tablet {
    
    constructor(parameters = {}) {
        // TABLET DIMENSIONS
        this.shape = 'round';
        this.length = 0.01;
        this.width = 0.0075;
        this.totalThickness = 0.00475;
        this.bandThickness = 0.00275;
        this.weight = 0.4;
        // BATCH 
        this.bulkDensity = 760000; 
        // DESCRIPTION
        this.productType = '';
        this.dosageForm = 'Tablet';
        this.productName = 'Colorcon Round Placebo';
        this.formulationName = 'Placebo-WP2';
        this.companyName = 'Colorcon';
        this.companyLocation = 'Irvine, CA';
        this.contactName = 'Jason Hansell';
        this.contactEmail = 'JHansell@colorcon.com';
        this.firebaseKey = '';
        // SET PROPERTIES PASSED THROUGH
        Object.getOwnPropertyNames(this).map(name => {
            if (!parameters[name]) { return }
            this[name] = parameters[name];
        });
    }
    
    // TABLET
    get compressedDensity() {
      // if it is a measured tablet we calculated the density.
      return this.weight / this.totalVolume;
    }
    
    // TOOLING
    get cupThickness() {
        return (this.totalThickness - this.bandThickness) / 2;
    }
    get lengthCupRadius() {
        return this._cupRadius(this.cupThickness, this.length);
    }
    get widthCupRadius() {
         return this._cupRadius(this.cupThickness, this.width);
    }
    _cupRadius(depth, length) {
        // see the link for more details on calculations
        // http://liutaiomottola.com/formulae/sag.htm
        let part1 = Math.pow(depth, 2);
        let part2 = Math.pow(length / 2, 2);
        let part3 = 2 * depth;
        return (part1 + part2) / part3;
    }
    get perimeter() {
        
        let perimeter;

        switch (this.shape) {

            case 'round':
                perimeter = this.length * Math.PI;
                break;

            case 'oval':
                // Calculate the cup perimeters and set the value;

                //for most calculations we uses radius not diameter
                let r1 = this.length / 2;
                let r2 = this.width / 2;

                //circum of ellipse is estiamted first
                //using ramanujan approximation of the circumference
                // https://en.wikipedia.org/wiki/Ellipse#Equations
                // 3(a + b)
                let part1 = (r1 + r2) * 3;
                // 10 * a * b
                let part2 = r1 * r2 * 10;
                // 3 (a2 + b2)
                let part3 = 3 * (Math.pow(r1, 2) + Math.pow(r2, 2));
                //bring together terms under sqrt and take sqrt
                let part4 = Math.sqrt(part2 + part3);
                // PI * 3(a + b) - sqrt term
                perimeter = Math.PI * (part1 - part4);
                break;

            case 'caplet':
                // each arc at the end is half circle. return the periemter of a sphere
                // with a diameter equal to the width the of the tablet.
                let caps = Math.PI * this.width;
                
                // the length of the flat edge
                // the radius of the end cap is equal to the half the width of the tablet
                // remove a full width for both end caps
                // we have two sides so multiply by 2
                let sides = (this.length - this.width) * 2;
                
                perimeter = caps + sides;
                break;
        }
        
        return perimeter;
    }
    get crossSectionArea() {
        
      let crossSection;

      switch (this.shape) {

          case 'round':
              crossSection = Math.PI * Math.pow(this.length / 2, 2);
              break;

          case 'oval':
              //for most calculations we uses radius not diameter
              let r1 = this.length / 2;
              let r2 = this.width / 2;
              // Calculate the cross sectional area and set value
              //PI * widthRadius * lengthRadius
              crossSection = Math.PI * r1 * r2;
              break;

          case 'caplet':
              // each end cap is considered a half circle and the diameter is the width of the tablet
              // thereofre we return the area of a circle
              // we use full circle because there are two end caps
              let caps = Math.PI * Math.pow(this.width / 2, 2);
              
              // the surface area of the "rectanglualr" mid section;
              // subtract our the width because this is the end caps;
              let rect = this.width * (this.length - this.width);
              
              // bring the values together for the total area
              crossSection = caps + rect;

              break;
      }

      return crossSection;
    }
    
    get concavity() {
        let ratio = this.cupThickness / this.length;
        if(ratio < 0) {
            return 'Error';
        } else if (ratio <= 0) {
            return 'Flat';
        } else if (ratio <= 0.04106  + 0.00383) {
            return 'Shallow';
        } else if (ratio <= 0.05846 + 0.35701) {
            return "Standard";
        } else if (ratio <= 0.07698 + 0.53399) {
            return "Deep";
        } else if (ratio <= 0.18457 + 0.11046) {
            return 'Extra-Deep';
        } else if (ratio <= 0.31628 - 0.00697) {
            return "Modified Ball";
        } else {
            return 'Ball';
        }
    }
    // SUFACE AREA
    get cupArea() {
        
        let area;
        switch (this.shape) {

            case 'round':
                // Calculate the CUP SURFACE AREA
                // which is based on the surface area of a sphere section
                // http://www.had2know.com/academics/spherical-cap-volume-surface-area-calculator.html
                let rad2 = Math.pow(this.length / 2, 2);
                let cup2 = Math.pow(this.cupThickness, 2);
                area = Math.PI * rad2 + cup2;
                break;

            default:  //for both oval and caplet we use an ellipse based model
                //for most calculations we uses radius not diameter
                let r1 = this.length / 2;
                let r2 = this.width / 2;
                let r3 = this.cupThickness; //not divided by 2 because it is alread a radius;
                
                // Calculate the CUP SURFACE AREA
                //first calculate the surface area of (1) face
                //based on the surface area of ellipsoid but only use half
                let part1 = (Math.pow(r1 * r2, 1.6) + Math.pow(r1 * r3, 1.6) + Math.pow(r2 * r3, 1.6)) / 3;
                // we divide by 2 at the end to get half the surface area
                area = 4 * Math.PI * Math.pow(part1, 1 / 1.6) / 2;
                break;
        }

        return area;
    }
    get bandArea() {
        return this.perimeter * this.bandThickness;
    }
    get totalArea() {
        return this.bandArea + this.cupArea * 2;
    }
    
    
    // VOLUME
    get totalVolume() {
        return this.bandVolume + this.cupVolume * 2;
    }
    get bandVolume() {
        return this.crossSectionArea * this.bandThickness;
    }
    get cupVolume() {
        
        let vol;

        switch (this.shape) {

            case 'round':
                // Calculate the CUP VOLUME.
                //The volume of (1) tablet face
                //based on the volume of sphere section
                //http://www.had2know.com/academics/spherical-cap-volume-surface-area-calculator.html
                let part1 = this.cupThickness / 6 * Math.PI;
                let part2 = Math.pow(this.length / 2, 2) * 3;
                let part3 = Math.pow(this.cupThickness, 2);
                vol = part1 * (part2 + part3);
                break;

            default:   //for both oval and caplet we use an ellipse based calculation
                
                //for most calculations we uses radius not diameter
                let r1 = this.length / 2;
                let r2 = this.width / 2;
                let r3 = this.cupThickness; //not divided by 2 because it is alread a radius;
                
                // Calculate the CUP VOLUME.
                //The volume of (1) tablet face
                //we return 1/2 the cup volume of an ellipsoid
                vol = r1 * r2 * r3 * (4 / 3) * Math.PI / 2;
                break;
                
        }

        return vol;
    }
    
    // AREA to VOLUME 
    get areaToVolume() {
        return this.totalArea / this.totalVolume;
    }
    
    // DISPLAY VALUES
    get isRound() {
        return (this.shape === 'round');
    }
    
    // FORMATTING HELPER FUNCTIONS
    _displayCM3(value) {
        return `${(value * 1000000).toFixed(2)} cm\u{000B3}`;
    }
    
    _displayCM2(value, decimals=2) {
        return `${(value * 10000).toFixed(decimals)} cm\u{000B2}`;
    }
    
    _displayCM(value) {
        return `${(value / 100).toFixed(2)} cm\u{0207B}\u{000B9}`;
    }
    _displayMM(value) {
        if(value <= 0) {return '';}
        return `${(value * 1000).toFixed(2)} mm`;
    }
    _displayGML(value) {
        if(value <= 0) { return ''; }
        return `${(value * 1e-6).toFixed(2)} g/ml`;
    }
    
    toJSON() {
        return Object.assign({}, this, 
            {
                totalArea: this.totalArea,
                isRound: this.isRound,
                concavity: this.concavity,
                bandThickness: this.bandThickness,
                lengthCupRadius: this.lengthCupRadius,
                widthCupRadius: this.widthCupRadius,
                formatted: {
                    length: this._displayMM(this.length),
                    width: this._displayMM(this.width),
                    totalThickness: this._displayMM(this.totalThickness),
                    weight: `${(this.weight * 1000).toFixed(1)} mg`,
                    bulkDensity: this._displayGML(this.bulkDensity),
                    compressedDensity: this._displayGML(this.compressedDensity),
                    totalArea: this._displayCM2(this.totalArea),
                    totalVolume: this._displayCM3(this.totalVolume),
                    areaToVolume: this._displayCM(this.areaToVolume),
                    cupDepth: this._displayMM(this.cupThickness),
                    lengthCupRadius: this._displayMM(this.lengthCupRadius),
                    widthCupRadius: this._displayMM(this.widthCupRadius),
                    perimeter: this._displayMM(this.perimeter),
                    crossSectionArea: this._displayCM2(this.crossSectionArea),
                    cupArea: this._displayCM2(this.cupArea),
                    cupVolume: this._displayCM2(this.cupVolume, 4)
                    
                }
            }
        );
    }
}

