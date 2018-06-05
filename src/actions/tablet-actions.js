
export class Tablet {

    constructor(parameters = {}) {
        
        this.productType = '';
        this.dosageForm = 'Tablet';
        this.productName = 'Colorcon Round Placebo';
        this.formulationName = 'Placebo-WP2';
        this.companyName = 'Colorcon';
        this.companyLocation = 'Irvine, CA';
        this.contactName = 'Jason Hansell';
        this.contactEmail = 'JHansell@colorcon.com';
        
        this.shape = 'round';
        this.length = 0.01;
        this.width = 0.0075;
        this.totalThickness = 0.00475;
        this.bandThickness = 0.00275;
        this.weight = 0.4;
        this.weightStdev = 0.01;
        this.bulkDensity = 760000;

        // Calcualted properties that are defined as enumerable
        Object.defineProperties(this, {
            compressedDensity: {
                get: () => {
                    return this.weight / this.totalVolume;
                },
                set: (value) => {
                    
                },
                enumerable: true
            },
            cupThickness: {
                get: () => {
                    return (this.totalThickness - this.bandThickness) / 2;
                },
                set: (value) => {
                    
                },
                enumerable: true
            },
            lengthCupRadius: {
                get: () => {
                    return this._cupRadius(this.cupThickness, this.length);
                },
                set: (value) => {
                    
                },
                enumerable: true
            },
            widthCupRadius: {
                get: () => {
                    return this._cupRadius(this.cupThickness, this.width);
                },
                set: (value) => {
                    
                },
                enumerable: true
            },
            perimeter: {
                get: () => {
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
                },
                set: (value) => {
                    
                },
                enumerable: true
            },
            crossSectionArea: {
                get: () => {

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
                },
                set: (value) => {
                    
                },
                enumerable: true
            },
            concavity: {
                get: () => {
                    let ratio = this.cupThickness / this.length;
                    if (ratio < 0) {
                        return 'Error';
                    }
                    else if (ratio <= 0) {
                        return 'Flat';
                    }
                    else if (ratio <= 0.04106 + 0.00383) {
                        return 'Shallow';
                    }
                    else if (ratio <= 0.05846 + 0.35701) {
                        return "Standard";
                    }
                    else if (ratio <= 0.07698 + 0.53399) {
                        return "Deep";
                    }
                    else if (ratio <= 0.18457 + 0.11046) {
                        return 'Extra-Deep';
                    }
                    else if (ratio <= 0.31628 - 0.00697) {
                        return "Modified Ball";
                    }
                    else {
                        return 'Ball';
                    }

                },
                set: (value) => {
                    
                },
                enumerable: true
            },
            cupArea: {
                get: () => {
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

                        default: //for both oval and caplet we use an ellipse based model
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
                },
                set: (value) => {
                    
                },
                enumerable: true
            },
            bandArea: {
                get: () => {
                    return this.perimeter * this.bandThickness;
                },
                set: (value) => {
                    
                },
                enumerable: true
            },
            totalArea: {
                get: () => {
                    return this.bandArea + this.cupArea * 2;
                },
                set: (value) => {
                    
                },
                enumerable: true
            },
            totalVolume: {
                get: () => {
                    return this.bandVolume + this.cupVolume * 2;
                },
                set: (value) => {
                    
                },
                enumerable: true
            },
            bandVolume: {
                get: () => {
                    return this.crossSectionArea * this.bandThickness;
                },
                set: (value) => {
                    
                },
                enumerable: true
            },
            cupVolume: {
                get: () => {
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

                        default: //for both oval and caplet we use an ellipse based calculation

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
                },
                set: (value) => {
                    
                },
                enumerable: true
            },
            areaToVolume: {
                get: () => {
                    return this.totalArea / this.totalVolume;
                },
                set: (value) => {
                    
                },
                enumerable: true
            },
        });
        
        // SET PROPERTIES PASSED THROUGH
        Object.getOwnPropertyNames(this).map(name => {
            if (!parameters[name]) { return }
            this[name] = parameters[name];
        });
    }

    _cupRadius(depth, length) {
        // see the link for more details on calculations
        // http://liutaiomottola.com/formulae/sag.htm
        let part1 = Math.pow(depth, 2);
        let part2 = Math.pow(length / 2, 2);
        let part3 = 2 * depth;
        return (part1 + part2) / part3;
    }
}

export const TABLET_LIBRARY = [
{
    "bandThickness" : 0.005,
    "bulkDensity" : 1250000,
    "companyName" : "Schiff",
    "contactName" : "Jason Hansell",
    "formulationName" : "Glucosamine + Chondroitin and MSM",
    "length" : 0.01928,
    "productName" : "Move Free Joint Health",
    "productType" : "Nutritional",
    "shape" : "caplet",
    "weight" : 1.39,
    "weightStdev": 1.38 * 0.025,
    "width" : 0.00832,
    "totalThickness" : 0.00820,
  },
  {
    "bandThickness" : 0.00427,
    "bulkDensity" : 1020000,
    "companyName" : "NBTY",
    "contactName" : "Jason Hansell",
    "formulationName" : "Magnesium Oxide 500mg",
    "length" : 0.0192,
    "productName" : "NBTY Magnesium Oxide 500mg",
    "productType" : "Nutritional",
    "shape" : "caplet",
    "weight" : 1.4354,
    "weightStdev": 1.4354 * 0.025,
    "width" : 0.00883,
    "totalThickness" : 0.00638,
  },
  {
    "bandThickness" : 0.0034,
    "bulkDensity" : 890000,
    "companyName" : "Up & Up",
    "contactName" : "Jason Hansell",
    "formulationName" : "Magnesium Oxide 250mg",
    "length" : 0.01127,
    "productName" : "Up & Up Magnesium 250mg",
    "productType" : "Nutritional",
    "shape" : "round",
    "totalThickness" : 0.00525,
    "weight" : 0.7525,
    "weightStdev" : 0.7525 * 0.025,
  },
  {
    "bandThickness" : 0.00337,
    "bulkDensity" : 720000,
    "companyName" : "Colorcon",
    "contactName" : "Jason Hansell",
    "formulationName" : "Placebo WP2",
    "length" : 0.019039999999999998,
    "productName" : "Colorcon Logo Caplet",
    "productType" : "Pharmaceutical",
    "shape" : "caplet",
    "totalThickness" : 0.005860000000000001,
    "weight" : 0.89,
    "weightStdev" : 0.89 * 0.025,
    "width" : 0.00845,
  },
  {
    "bandThickness" : 0.00433,
    "bulkDensity" : 670000,
    "companyName" : "Gilead",
    "contactName" : "Jason Hansell",
    "formulationName" : "Placebo",
    "length" : 0.02395,
    "productName" : "Gilead Atripla Placebo",
    "productType" : "Pharmaceutical",
    "shape" : "caplet",
    "totalThickness" : 0.00774,
    "weight" : 1.611,
    "weightStdev" : 1.611 * 0.025,
    "width" : 0.01067,
  },
  {
    "bandThickness" : 0.00238,
    "bulkDensity" : 731000,
    "companyName" : "Colorcon",
    "contactName" : "Jason Hansell",
    "formulationName" : "Placebo WP2",
    "length" : 0.01007,
    "productName" : "Colorcon Logo Round Placebo",
    "productType" : "Pharmaceutical",
    "shape" : "round",
    "totalThickness" : 0.00445,
    "weight" : 0.3539,
    "weightStdev" : 0.3539 * 0.025
  },
  {
    "bandThickness" : 0.00316,
    "companyName" : "Colorcon",
    "contactName" : "Jason Hansell",
    "formulationName" : "Placebo WP2",
    "length" : 0.00798,
    "productName" : "Round Scored Placebo",
    "productType" : "Pharmaceutical",
    "shape" : "round",
    "totalThickness" : 0.00473,
    "weight" : 0.2592,
  },
  {
    "bandArea" : 1.8698052324796045E-4,
    "bandThickness" : 0.004,
    "bandVolume" : 5.121947470788084E-7,
    "batchVolume" : 0.1343784994400896,
    "batchWeight" : 120000,
    "batchWeightInKG" : "120.0",
    "bulkDensity" : 893000,
    "bulkDensityInGML" : "0.89",
    "companyName" : "Merical",
    "compressedDensity" : 1472217.8754326352,
    "compressedDensityInGML" : "1.47",
    "contactName" : "Jason Hansell",
    "count" : 119237,
    "crossSectionArea" : 1.280486867697021E-4,
    "cupArea" : 1.2339969735254344E-4,
    "cupThickness" : 0.0011749999999999998,
    "cupVolume" : 8.569986204444336E-8,
    "dimensionsInMM" : "19.2 x 7.2",
    "firebaseKey" : "-L0zFsTr0vHliFDDTE35",
    "formulationName" : "Merical Blend",
    "isRound" : false,
    "length" : 0.01924,
    "lengthCupRadius" : 0.03996809574468086,
    "perimeter" : 0.04674513081199011,
    "productName" : "Merical Multi-Vitamin & Mineral ",
    "productType" : "Nutritional",
    "shape" : "caplet",
    "surfaceAreaInCM2" : "4.34",
    "totalArea" : 4.3377991795304736E-4,
    "totalThickness" : 0.00635,
    "totalVolume" : 6.835944711676951E-7,
    "volumeInCM3" : "0.68",
    "weight" : 1.0064,
    "weightInMG" : "1006.4",
    "width" : 0.007240000000000001,
    "widthCupRadius" : 0.006163840425531917

}];

