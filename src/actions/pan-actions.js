
export class Pan { 
  
  constructor(parameters = {}) {
    this.panDiameter = 1.2192;
    this.openingDiameter = 0.4826;
    this.wallWidth = 0.508;
    this.brimWidth = 0.93345;
    this.modelName = "Fastcoat";
    this.manufacturerName = "O'Hara";
    this.nickname = '48" Room';
    this.companyName = 'Colorcon';
    this.contactName = 'Jason Hansell';
    this.contactEmail = 'JHansell@colorcon.com';
    this.companyLocation = 'Harleysville, PA';
    this.baffleType = 'Ploughshare';
    this.baffleCount = '4';
    this.baffleHeight = '';
    this.gunMake = 'Schlick';
    this.gunModel = '930';
    this.gunCount = '3';
    this.gunToGunDistance = '';
    this.maxAirflow = 2000;
    this.airflowType = '';
    this.perforationType = 'Fully';
    this.firebaseKey = '';
    
    Object.getOwnPropertyNames(this).map(prop => {
        if(!parameters[prop]) { return }
        this[prop] = parameters[prop];
    });
    
    Object.defineProperties(this, {
      radius: {
        get: () => {
          return this.panDiameter / 2;
        },
        enumerable: true
      },
      brimHeight: {
        get: () => {
          return (this.panDiameter - this.openingDiameter) / 2;
        },
        enumerable: true
      },
      brimVolume: {
        get: () => {
          let volume =  this.calcVolume(this.brimHeight);
    // console.assert((volume > 0.17 * 0.9 && volume < 0.17 * 1.1), `The total volume is outside the O'Hara 48" pan target of 170L. The calculated volume is ${volume} m3`);
    // console.assert((volume > 0.0145 * 0.9 && volume < 0.0145 * 1.1), `The total volume is outside the O'Hara 19" pan target of 14.5L. The calculated volume is ${volume} m3`);
    return volume;
        },
        enumerable: true
      },
      maxFillVolume: {
        get: () => {
          return this.calcVolume(this.maxFillHeight);
        },
        enumerable: true
      },
      minFillVolume: {
        get: () => {
          return this.calcVolume(this.minFillHeight);
        },
        enumerable: true
      },
    })
  }

  get sideWallSlope() {
    // slope = rise / run
    // run = the distance on one side
    return this.brimHeight / ((this.brimWidth - this.wallWidth) / 2);
  }
  get sideWallLength() {
    // pythogrean theroem
    // a2 + b2 = c2
    // run = the distance on one side
    let a2 = Math.pow(((this.brimWidth - this.wallWidth) / 2), 2);
    let b2 = Math.pow(this.brimHeight, 2);
    return Math.sqrt(a2 + b2);
  }
  get brimLength() {
    return this.calcChordLength(this.brimHeight);
  }
  get maxFillHeight() {
    let limit = 0.0254;
    if(this.brimHeight < 0.0254 * 4) {
      limit = 0.0254 / 2;
    }
    return this.brimHeight - limit;
  }
  get maxFillLength() {
    return this.calcChordLength(this.maxFillHeight);
  }
  get minFillHeight() {
    if(this.baffleHeight > 0) {
      return this.baffleHeight;
    } else {
      return this.brimHeight * 0.7;
    }
  
  }
  get minFillLength() {
    return this.calcChordLength(this.minFillHeight);
  }
  
  // HELPER FUNCTIONS
  calcChordLength(saggita) {
    //brim width... the chord length at the brim height
    //typically close to the full diameter as the brim height is near the center
    //determined from pythogrean therom of a triangle from the brim height chord and radius
    return 2 * Math.sqrt(Math.pow(this.radius, 2) - Math.pow((this.radius - saggita), 2)); 
  }
  calcSphereSectionArea(chord, saggita){
    //see link for more details
    // http://mathworld.wolfram.com/CircularSegment.html
    
    //the total area of a circle with the diameter
    let fullCircleArea = Math.PI * Math.pow(this.radius, 2);
    
    //split the width in half making a right angle triangle
    //determine the angle using sin (opposite / hypoteneus)
    //times two since we need both sides
    let centralAngle = 2 * Math.asin((chord / 2) / this.radius);
    
    //the area of the sphere from the central angle
    //the central angle divided by 2 x PI in radians is the fraction of the area we need
    // central angle is in radians
    let sectionArea = centralAngle / (2 * Math.PI) * fullCircleArea;
    
    //we determine the area of a the triangle to be removed
    // base * height / 2
    //base is the width or brimWidth
    // height is the radius - brimHeight aka height
    let triangleArea = chord * (this.radius - saggita) / 2;
    
    //remove the triangle area leaving the area of the circle segment
    return sectionArea - triangleArea;
  }
  calcSideWallVolume(fillHeight) {
    // following the formula for a partial cone section
    // http://keisan.casio.com/exec/system/14748682342922
    const h = this.radius / this.sideWallSlope;
    const a = fillHeight;
    const r = this.radius;
    const k = 1 - (a / r);
    
    const part1 = h * Math.pow(r, 2) / 3;
    const part2 = Math.PI / 2;
    const part3 = 2 * k * Math.sqrt(1 - Math.pow(k, 2));
    const part4 = Math.asin(k);
    const part5 = Math.pow(k, 3) * Math.acosh(1/k);
    
    return part1 * (part2 - part3 - part4 + part5);
  }
  calcVolume(fillHeight) {
        
      //two section to get the volume
      // 1. main cylinder along the flat pan wall
      // 2. two sides along the sloped side walls
        
        // at this height determine the width / chord;
      let length = this.calcChordLength(fillHeight);
      // to get the main cylinder volume we calculate the area of the sphere segment 
      // times the width of the pan wall
      let center = this.calcSphereSectionArea(length, fillHeight) * this.wallWidth ;
      
      // console.assert((center > 0.1510833 * 0.9 && center < 0.1510833 * 1.1), `The center volume is not within spec of the default 48" pan of 0.1510833. The volume is ${center} m3`);
      // console.assert((center > 0.0122707908 * 0.9 && center < 0.0122707908 * 1.1), `The center volume is not within spec of the default 19" pan of 0.0122707908. The volume is ${center} m3`);
     
      //side wall volume is like a cone
      let cone = this.calcSideWallVolume(fillHeight);
      
      // console.assert((cone > 0.00945835 * 0.9 && cone < 0.00945835 * 1.1), `The side volume is not within spec of the default 48" pan 0.00945835. The volume is ${cone} m3`);
      // console.assert((cone > 0.0011146046 * 0.85 && cone < 0.0011146046 * 1.15), `The side volume is not within spec of the default 19" pan 0.0011146046. The volume is ${cone} m3`);
     
      //side wall volume is like a cone
      //to get the total volume we use the center and two cones;
      // value is in meters ^3;
      return center + cone + cone;
      
    }
}