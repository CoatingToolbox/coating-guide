export class Pan {

  constructor(parameters = {}) {
    this.mainDiameter = 1.2192;
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
    this.maxAirflow = 2000 * 1.699011; /* m3/h */
    this.airflowType = '';
    this.perforationType = 'Fully';

    Object.getOwnPropertyNames(this).map(prop => {
      if (!parameters[prop]) { return }
      this[prop] = parameters[prop];
    });

    Object.defineProperties(this, {
      radius: {
        get: () => {
          return this.mainDiameter / 2;
        },
        enumerable: true
      },
      brimHeight: {
        get: () => {
          return (this.mainDiameter - this.openingDiameter) / 2;
        },
        set: (value) => {

        },
        enumerable: true
      },
      brimVolume: {
        get: () => {
          let volume = this.calcVolume(this.brimHeight);
          // console.assert((volume > 0.17 * 0.9 && volume < 0.17 * 1.1), `The total volume is outside the O'Hara 48" pan target of 170L. The calculated volume is ${volume} m3`);
          // console.assert((volume > 0.0145 * 0.9 && volume < 0.0145 * 1.1), `The total volume is outside the O'Hara 19" pan target of 14.5L. The calculated volume is ${volume} m3`);
          return volume;
        },
        set: (value) => {

        },
        enumerable: true
      },
      maxFillVolume: {
        get: () => {
          return this.calcVolume(this.maxFillHeight);
        },
        set: (value) => {

        },
        enumerable: true
      },
      minFillVolume: {
        get: () => {
          return this.calcVolume(this.minFillHeight);
        },
        set: (value) => {

        },
        enumerable: true
      },
    });
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
    if (this.brimHeight < 0.0254 * 4) {
      limit = 0.0254 / 2;
    }
    return this.brimHeight - limit;
  }
  get maxFillLength() {
    return this.calcChordLength(this.maxFillHeight);
  }
  get minFillHeight() {
    if (this.baffleHeight > 0) {
      return this.baffleHeight;
    }
    else {
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
  calcSphereSectionArea(chord, saggita) {
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
    const part5 = Math.pow(k, 3) * Math.acosh(1 / k);

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
    let center = this.calcSphereSectionArea(length, fillHeight) * this.wallWidth;

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

export const PAN_LIBRARY = [{
    "baffleCount": 5,
    "baffleHeight": "",
    "baffleType": "Anti-slide Bars",
    "brimWidth": 0.2032,
    "companyName": "Colorcon",
    "gunCount": 1,
    "gunMake": "",
    "gunModel": "Mini",
    "gunToGunDistance": "",
    "companyLocation": "Irvine, CA",
    "manufacturername": "O'Hara",
    "maxAirflow": 150 * 1.699011,
    "modelName": "Labcoat IIX",
    "nickname": "O'Hara Labcoat II with 12\" Pan",
    "openingDiameter": 0.1524,
    "mainDiameter": 0.3048,
    "perforations": "Fully",
    "wallWidth": 0.1143,
    "contactName": "Jason Hansell",
    "contactEmail": "JHansell@colorcon.com",
    "airflowType": "",
    "brimVolume": 0.0021064663565724655,
    "maxFillVolume": 0.0015689992033467448,
    "minFillVolume": 0.001185142495336501,
  },
  {
    "baffleCount": 2,
    "baffleHeight": "",
    "baffleType": "Ploughshare",
    "brimWidth": 0.31115,
    "companyName": "Colorcon",
    "gunCount": 1,
    "gunMake": "",
    "gunModel": "970 Series ",
    "gunToGunDistance": "",
    "companyLocation": "Irvine, CA",
    "manufacturername": "O'Hara",
    "maxAirflow": 200 * 1.699011,
    "modelName": "Labcoat IIX",
    "nickname": "O'Hara Labcoat II with 15\" Pan",
    "openingDiameter": 0.2032,
    "mainDiameter": 0.381,
    "perforations": "Fully",
    "wallWidth": 0.2032,
    "contactName": "Jason Hansell",
    "contactEmail": "JHansell@colorcon.com",
    "airflowType": "",
    "brimVolume": 0.004931792062565622,
    "maxFillVolume": 0.0038709416351730857,
    "minFillVolume": 0.002817957253161739,
  },
  {
    "baffleCount": 3,
    "baffleHeight": "",
    "baffleType": "Ploughshare",
    "brimWidth": 0.43815,
    "companyName": "Colorcon",
    "gunCount": 1,
    "gunMake": "",
    "gunModel": "VAU",
    "gunToGunDistance": "",
    "companyLocation": "Irvine, CA",
    "manufacturername": "O'Hara",
    "maxAirflow": 250 * 1.699011,
    "modelName": "Labcoat",
    "nickname": "O'Hara Labcoat II with 19\" Pan",
    "openingDiameter": 0.2032,
    "mainDiameter": 0.4826,
    "perforations": "Fully",
    "wallWidth": 0.2794,
    "contactName": "Jason Hansell",
    "contactEmail": "JHansell@colorcon.com",
    "airflowType": "",
    "brimVolume": 0.014852644690076676,
    "maxFillVolume": 0.01087890282340842,
    "minFillVolume": 0.008537168033050147,
  },
  {
    "baffleCount": 4,
    "baffleHeight": "",
    "baffleType": "Ploughshare",
    "brimWidth": 0.508,
    "companyName": "Colorcon",
    "gunCount": 2,
    "gunMake": "",
    "gunModel": "VAU",
    "gunToGunDistance": 0.15239999999999998,
    "companyLocation": "Irvine, CA",
    "manufacturername": "O'Hara",
    "maxAirflow": 300 * 1.699011,
    "modelName": "Labcoat II",
    "nickname": "O'Hara Labcoat II with 24\" Pan",
    "openingDiameter": 0.254,
    "mainDiameter": 0.6096,
    "perforations": "Fully",
    "wallWidth": 0.3302,
    "contactName": "Jason Hansell",
    "contactEmail": "JHansell@colorcon.com",
    "airflowType": "",
    "brimVolume": 0.02804194300355472,
    "maxFillVolume": 0.022105004918933344,
    "minFillVolume": 0.01616001108723813,

  },
  {
    "baffleCount": 4,
    "baffleHeight": "",
    "baffleType": "Ploughshare",
    "brimWidth": 0.6477,
    "companyName": "Colorcon",
    "gunCount": 2,
    "gunMake": "",
    "gunModel": "VAU",
    "gunToGunDistance": 0.15239999999999998,
    "companyLocation": "Irvine, CA",
    "manufacturername": "O'Hara",
    "maxAirflow": 500 * 1.699011,
    "modelName": "Labcoat II",
    "nickname": "O'Hara Labcoat II with 30\" Pan",
    "openingDiameter": 0.254,
    "mainDiameter": 0.762,
    "perforations": "Fully",
    "wallWidth": 0.381,
    "contactName": "Jason Hansell",
    "contactEmail": "JHansell@colorcon.com",
    "airflowType": "",
    "brimVolume": 0.0636237058163819,
    "maxFillVolume": 0.05402839437836534,
    "minFillVolume": 0.03650883878089783,
  },
  {
    "baffleCount": 4,
    "baffleHeight": "",
    "baffleType": "Ploughshare",
    "brimWidth": 0.93345,
    "companyName": "Colorcon",
    "gunCount": 3,
    "gunMake": "",
    "gunModel": "930 Series",
    "gunToGunDistance": 0.15239999999999998,
    "companyLocation": "West Point, PA",
    "manufacturername": "O'Hara",
    "maxAirflow": 2000 * 1.699011,
    "modelName": "Fastcoat",
    "nickname": "O'Hara Fastcoat in Coating School",
    "openingDiameter": 0.4826,
    "mainDiameter": 1.2192,
    "perforations": "Fully",
    "wallWidth": 0.508,
    "contactName": "Jason Hansell",
    "contactEmail": "JHansell@colorcon.com",
    "airflowType": "",
    "brimVolume": 0.19772444547101514,
    "maxFillVolume": 0.17639493236350845,
    "minFillVolume": 0.11179787759772739,
  },
  {
    "baffleCount": "0",
    "baffleHeight": "",
    "baffleType": "Ploughshare",
    "brimWidth": 1.2192,
    "companyName": "Par Pharmaceuticals",
    "gunCount": "",
    "gunMake": "",
    "gunModel": "",
    "gunToGunDistance": "",
    "companyLocation": "Irvine, CA",
    "manufacturerName": "Thomas Engineering",
    "maxAirflow": 5000 * 1.699011,
    "modelName": "Accela Cota",
    "nickname": "Thomas Engineering Accela Cota ",
    "openingDiameter": 0.4826,
    "mainDiameter": 1.524,
    "perforations": "Fully",
    "wallWidth": 0.635,
    "contactName": "Jason Hansell",
    "contactEmail": "JHansell@colorcon.com",
    "airflowType": "",
    "brimVolume": 0.46636002627194656,
    "maxFillVolume": 0.43082794580782346,
    "minFillVolume": 0.2643187561308071,
  }

];
