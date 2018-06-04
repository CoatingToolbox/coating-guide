
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
const computePathTopTablet = (shape, width, length) => {

  let path;

  switch (shape) {

    case 'round':
      //Path is designed to fit in a 50 by 50 pixel box
      //scale is used to shrink or grow the value as needed
      //to draw the tablet we use radius so we scale it and divide by 2
      let scaledRadius = length / 2 * svg.scale;
      // TOP VIEW
      path = "m " + svg.centerX + " " + (svg.centerY) +
        " m " + scaledRadius + " 0" +
        " a " + scaledRadius + " " + scaledRadius + " 0 0 0 " + (-scaledRadius * 2) + " 0" +
        " a " + scaledRadius + " " + scaledRadius + " 0 0 0 " + (scaledRadius * 2) + " 0 z";
      break;

    case 'oval':
      //Path is designed to fit in a 50 by 50 pixel box
      //scale is used to shrink or grow the value as needed
      //to draw the tablet we use radius so we scale it and divide by 2
      let r1 = length / 2 * svg.scale;
      let r2 = width / 2 * svg.scale;
      // TOP VIEW
      path = "m " + svg.centerX + " " + (svg.centerY) +
        " m " + r1 + " 0" +
        " a " + r1 + " " + r2 + " 0 0 0 " + (-r1 * 2) + " 0" +
        " a " + r1 + " " + r2 + " 0 0 0 " + (r1 * 2) + " 0 z";
      break;

    case 'caplet':
      //Path is designed to fit in a 50 by 50 pixel box
      //scale is used to shrink or grow the value as needed
      let scaledWidth = width * svg.scale;
      let scaledBody = (length - width) * svg.scale;

      path = "m " + svg.centerX + " " + (svg.centerY) +
        " m " + (scaledBody / 2) + " " + (scaledWidth / 2) +
        " l " + -scaledBody + " 0" +
        " a " + (scaledWidth / 2) + " " + (scaledWidth / 2) + " 0 0 1 0 " + -scaledWidth +
        " l " + scaledBody + " 0" +
        " a " + (scaledWidth / 2) + " " + (scaledWidth / 2) + " 0 0 1 0 " + scaledWidth + " z";
      break;
  }

  return path;
};
const computePathLine = (line, shape, width, length) => {
  switch(line) {
    case 'width':
      return computePathWidthLine(length, width);
    case 'length':
      return computePathLengthLine(shape, length, width);
    default: 
      return '';
  }
};
const computePathLengthLine = (shape, length, width) => {
  if (shape === 'round') {
    width = length;
  }

  let scaledLength = length * svg.scale;
  let scaledWidth = width * svg.scale;

  return "M " + (svg.centerX - scaledLength / 2) + " " + (svg.centerY + scaledWidth / 2 + svg.padding ) +
    " l 0 " + svg.cap +
    " m 0 " + (-svg.cap / 2) +
    " l " + scaledLength + " 0" +
    " m 0 " + (-svg.cap / 2) +
    " l 0 " + svg.cap;
};
const computePathWidthLine = (length, width) => {


  let scaledLength = length * svg.scale;
  let scaledWidth = width * svg.scale;

  return "M " + (svg.centerX + scaledLength / 2 + svg.padding) + ' ' + (svg.centerY - scaledWidth / 2) +
    " l " + svg.cap + " 0" +
    " m " + (-svg.cap / 2) + " 0" +
    " l 0 " + scaledWidth +
    " m " + (svg.cap / 2) + " 0" +
    " l " + -svg.cap + " 0";
};

class TabletDimensionsGraphic extends connect(store)(LitElement) {
  
  static get properties () {
    return {
      view: String,
      line: String,
      shape: String,
      width: Number,
      length: Number
    };
  }
  
  _stateChanged(state) {
    this.shape = state.tablet.shape;
    this.length = state.tablet.length;
    this.width = state.tablet.width;
  }
  
  _render ({ line, shape, length, width }) {
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
          <path d$='${ computePathTopTablet(shape, width, length) }'></path>
          <path d$='${ computePathLine(line, shape, width, length) }'></path>
        </svg>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('tablet-dimensions-graphic', TabletDimensionsGraphic);