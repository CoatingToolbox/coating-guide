
import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

const svg = {
  // padding around the edge of svg
  padding: 1.5,
  // the end cap of the dimension line
  cap: 2,
  //target width of svg
  width: 24,
  height: 18,
  //max length of tablet
  //we use 0.02 meters = 20 mm;
  maxHeight: 0.02,
  // scale: 1050,
  // the value to multiple other dimensions by to scale
  get scale() {
    return (this.height - (2 * this.padding)) / this.maxHeight;
  },
  // center starting point
  get centerX() {
    return this.width / 2;
  },
  // center starting point
  get centerY() {
    return this.height / 2;
  }
};


// SVG Path function
const computePathSideTablet = (shape, length, cupRadius, bandThickness) => {
  let scaledLength = length * svg.scale;
  let scaledBand = bandThickness * svg.scale;
  let scaledCup = cupRadius * svg.scale;

  // TOP ARC
  return "m " + svg.centerX + " " + (svg.centerY) +
    " m " + (-scaledLength / 2) + " " + (-scaledBand / 2) +
    " a " + scaledCup + " " + scaledCup + " 0 0 1 " + scaledLength + " 0" +
    " l 0 " + scaledBand +
    " a " + scaledCup + " " + scaledCup + " 0 0 1 " + -scaledLength + " 0" +
    " l 0 " + -scaledBand +
    " l " + scaledLength + " 0" +
    " m 0 " + scaledBand +
    " l " + -scaledLength + " 0";
};
const computePathLine = (line, totalThickness, bandThickness, length) => {
  switch(line) {
    case 'total':
      return computePathThicknessLine(totalThickness, length);
    case 'band':
      return computePathThicknessLine(bandThickness, length);
    default: 
      return '';
  }
};
// const computePathTopCup = (shape, length, cupRadius, bandThickness) => {
//   let scaledLength = length * svg.scale;
//   let scaledBand = bandThickness * svg.scale;
//   let scaledCup = cupRadius * svg.scale;

//   // TOP ARC
//   return "m " + svg.center + " " + (svg.center) +
//     " m " + (-scaledLength / 2) + " " + (-scaledBand / 2) +
//     " a " + scaledCup + " " + scaledCup + " 0 0 1 " + scaledLength + " 0" +
//     " l " + -scaledLength + " 0 z";
// };
// const computePathBottomCup = (shape, length, cupRadius, bandThickness) => {
//   //Path is designed to fit in a 50 by 50 pixel box
//   //scale is used to shrink or grow the value as needed
//   //to draw the tablet we use radius so we scale it and divide by 2

//   let scaledLength = length * svg.scale;
//   let scaledBand = bandThickness * svg.scale;
//   let scaledCup = cupRadius * svg.scale;

//   // TOP ARC
//   return "m " + svg.center + " " + (svg.center) +
//     " m " + (scaledLength / 2) + " " + (scaledBand / 2) +
//     " a " + scaledCup + " " + scaledCup + " 0 0 1 " + -scaledLength + " 0" +
//     " l " + scaledLength + " 0 z";
// };
// const computePathBand = (shape, length, bandThickness) => {
//   //Path is designed to fit in a 50 by 50 pixel box
//   //scale is used to shrink or grow the value as needed
//   //to draw the tablet we use radius so we scale it and divide by 2

//   let scaledLength = length * svg.scale;
//   let scaledBand = bandThickness * svg.scale;

//   // SIDE BAND
//   return "m " + svg.center + " " + (svg.center) +
//     " m " + (scaledLength / 2) + " " + (-scaledBand / 2) +
//     " l 0 " + scaledBand +
//     " l " + -scaledLength + " 0" +
//     " l 0 " + -scaledBand +
//     " l " + scaledLength + " 0 z";
// };
const computePathThicknessLine = (thickness, length) => {
  //Path is designed to fit in a 50 by 50 pixel box
  //scale is used to shrink or grow the value as needed
  //to draw the tablet we use radius so we scale it and divide by 2

  var scaledLength = length * svg.scale;
  var scaledThickness = thickness * svg.scale;

  return "M " + (svg.centerX + scaledLength / 2 + svg.padding) + ' ' + (svg.centerY - scaledThickness / 2) +
    " l " + svg.cap + " 0" +
    " m " + (-svg.cap / 2) + " 0" +
    " l 0 " + scaledThickness +
    " m " + (svg.cap / 2) + " 0" +
    " l " + -svg.cap + " 0";
};
const computePathCupThicknessLine = (cup, total, length) => {
  //Path is designed to fit in a 50 by 50 pixel box
  //scale is used to shrink or grow the value as needed
  //to draw the tablet we use radius so we scale it and divide by 2

  var scaledLength = length * svg.scale;
  var scaledTotal = total * svg.scale;
  var scaledCup = cup * svg.scale;

  return "M " + (svg.centerX + scaledLength / 2 + svg.padding) + ' ' + (svg.centerY - scaledTotal / 2) +
    " l " + svg.cap + " 0" +
    " m " + (-svg.cap / 2) + " 0" +
    " l 0 " + scaledCup +
    " m " + (svg.cap / 2) + " 0" +
    " l " + -svg.cap + " 0";
};

class TabletThicknessGraphic extends connect(store)(LitElement) {
  
  static get properties () {
    return {
      line: String,
      shape: String,
      length: Number,
      lengthCupRadius: Number,
      bandThickness: Number,
      totalThickness: Number
    };
  }
  
  _stateChanged(state) {
    this.shape = state.tablet.shape;
    this.length = state.tablet.length;
    this.lengthCupRadius = state.tablet.lengthCupRadius;
    this.bandThickness = state.tablet.bandThickness;
    this.totalThickness = state.tablet.totalThickness;
  }
  
  _render ({ line, shape, length, lengthCupRadius, bandThickness, totalThickness }) {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          background-color: var(--background-color);
          border: 5px solid var(--border-color);
          --tablet-fill-color: var(--app-light-color);
          --tablet-outline-color: var(--app-primary-color);
        }
        
        .tablet-graphic {
          height: 100%;
          max-height: 196px;
          width: 100%;
          fill: var(--tablet-fill-color);
          fill-opacity: 0.8;
          stroke: var(--tablet-outline-color);
          stroke-width: 0.35px;
          stroke-linejoin: round;
        }
      </style>
      
        <svg class='tablet-graphic' viewbox='0 0 24 18'>
          <path d$='${ computePathSideTablet(shape, length, lengthCupRadius, bandThickness) }'></path>
          <path d$='${ computePathLine(line, totalThickness, bandThickness, length) }'></path>
        </svg>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-thickness-graphic', TabletThicknessGraphic);