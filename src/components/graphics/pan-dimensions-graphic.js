
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
  // max length of the graphic
  maxHeight: 1.75,
  
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

const getFrontPan = (diameter) => {
          //helper values
          let scaledDiameter = diameter * svg.scale;
          let rad = scaledDiameter / 2;
      
          return  "M " + svg.centerX + " " + svg.centerY +
                  " m " + -rad + " 0" +
                  " a " + rad + " " + rad + " 0 0 0 " + scaledDiameter + " 0" +
                  " a " + rad + " " + rad + " 0 0 0 " + -scaledDiameter + " 0 z";
      } ;
const getFrontFill = (diameter, fillHeight) => {
        
        //helper values
        let scaledFill = fillHeight * svg.scale;
        let scaledDiameter = diameter * svg.scale;
        let scaledRadius = scaledDiameter / 2;
        
        
        //we stopp the graphic if fill height is bigger than pan radius
        if(scaledFill > scaledRadius){
          scaledFill = scaledRadius;
        }
        
        //the difference of the pan radius and fill height
        let gapHeight = scaledRadius - scaledFill;
        //right triangle from radius and gap height gives x coordinate for starting arc fill
        let fillHalfChord = Math.sqrt(Math.pow(scaledRadius, 2) - Math.pow(gapHeight, 2));
        
        return  "M " + (svg.centerX - fillHalfChord) + " " + (svg.centerY + gapHeight) +
                      " a " + scaledRadius + " " + scaledRadius + " 0 0 0 " + (2 * fillHalfChord) + " 0 z";
      };
const getFrontLine = (diameter, opening, line) => {
  let d;
  switch(line) {
    case 'main':
      d = diameter;
      break;
    case 'opening':
      d = opening;
      break;
    default: 
    return '';
  }
  let scaledDiameter = diameter * svg.scale;
  let scaledD = d * svg.scale;
  
  return `M ${ svg.centerX + scaledDiameter / 2 + svg.padding} ${svg.centerY - scaledD / 2}
     l ${svg.cap} 0 m ${-svg.cap / 2} 0 l 0 ${scaledD} m ${svg.cap / 2} 0 l ${-svg.cap} 0`;
};

const getSidePan = (diameter, open, wall, brim) => {
        //helper values
        let scaledDiameter = diameter * svg.scale;
        let scaledOpen = open * svg.scale;
        let scaledWall = wall * svg.scale;
        let scaledDepth = brim * svg.scale;
        
        //distance from brim to starting wall. Only one side This gives us the slope of the pan walls
        let wallX = (scaledDepth - scaledWall) / 2;
        //the difference in height from the brim to diameter only on one side
        let wallY = (scaledDiameter - scaledOpen) / 2;
        
        return "M " + svg.centerX + " " + svg.centerY + 
                " m " + (scaledDepth / 2) + " " + (scaledOpen / 2) +
                " l " + -wallX + " " + wallY + 
                " l " + -scaledWall + " 0" +
                " l " + -wallX + " " + -wallY +
                " l 0 " + -scaledOpen +
                " l " + wallX + " " + -wallY +
                " l " + scaledWall + " 0" + 
                " l " + wallX + " " + wallY +
                " l 0 " + scaledOpen + " z";
      }
const getSideFill= (diameter, open, wall, brim, fillHeight) => {
        //helper values
        let scaledDiameter = diameter * svg.scale;
        let scaledOpen = open * svg.scale;
        let scaledWall = wall * svg.scale;
        let scaledDepth = brim * svg.scale;
        let scaledFill = fillHeight * svg.scale;
        let brimToFill = (scaledDiameter - scaledOpen) / 2 - scaledFill;
        
        //distance from brim to starting wall. Only one side This gives us the slope of the pan walls
        let wallX = (scaledDepth - scaledWall) / 2;
        //the difference in height from the brim to diameter only on one side
        let wallY = (scaledDiameter - scaledOpen) / 2;
        
        let slope = wallY / wallX;
        
        let fillX = brimToFill / slope;
        
        return "M " + svg.centerX + " " + svg.centerY + 
                " m " + (scaledDepth / 2) + " " + (scaledOpen / 2) +
                " m " + (-fillX) + " " + (brimToFill) + 
                " l " + (-wallX + fillX) + " " + (wallY - brimToFill) + 
                " l " + -scaledWall + " 0" +
                " l " + (-wallX + fillX) + " " + (-wallY + brimToFill) + " z";
      }
const getSideLine = (diameter, wallWidth, brimWidth, line) => {
  let x;
  switch(line) {
    case 'wall':
      x = wallWidth;
      break;
    case 'brim':
      x = brimWidth;
      break;
    default: 
    return '';
  }
  let scaledDiameter = diameter * svg.scale;
  let scaledX = x * svg.scale;
  
  return `M ${ svg.centerX - scaledX / 2} ${svg.centerY + scaledDiameter / 2 + svg.padding}
     l 0 ${svg.cap} m 0 ${-svg.cap / 2} l ${scaledX} 0 m 0 ${svg.cap / 2} l 0 ${-svg.cap}`;
};
class PanDimensionsGraphic extends connect(store)(LitElement) {
  
  static get properties () {
    return {
      line: String,
      diameter: Number,
      opening: Number,
      fillHeight: Number, 
      wallWidth: Number,
      brimWidth: Number
    };
  }
  _stateChanged(state) {
    this.diameter = state.pan.mainDiameter;
    this.opening = state.pan.openingDiameter;
    this.fillHeight = state.pan.brimHeight;
    this.wallWidth = state.pan.wallWidth;
    this.brimWidth = state.pan.brimWidth;
  }
  
  _render ({ diameter, opening, fillHeight, wallWidth, brimWidth, line }) {
    // Template getter must return an instance of HTMLTemplateElement.
    // The html helper function makes this easy.
    return html`
      <style>
        :host {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          --pan-color: #F2F2F2;
          --pan-outline-color: var(--text-light-color);
          --pan-fill-color: var(--app-light-color, #FF514B);
        }
        
        .line {
          stroke: var(--app-primary-color);
        }
        .graphic {
          align-self: end;
          height: 100%;
          max-height: 196px;
          width: 100%;
          fill: var(--pan-color);
          stroke: var(--pan-outline-color);
          fill-opacity: 1;
          stroke-width: 0.35px;
          stroke-linejoin: bevel;
        }
        .volume {
          fill: var(--pan-fill-color);
          fill-opacity: 1;
        }
        .label {
          font-size: 16px;
          color: var(--text-light-color);
          align-self: start;
          justify-self: center;
        }
      </style>
      
        <svg class='graphic' viewbox='0 0 24 18'>
          <path class='outline' d$='${ getFrontPan(diameter) }'></path>
          <path class='volume' d$='${ getFrontFill(diameter, fillHeight) }'></path>
          <path class='outline' d$='${ getFrontPan(opening) }'></path>
          <path class='line' d$='${ getFrontLine(diameter, opening, line) }'></path>
        </svg>
      
        <svg class='graphic' viewbox='0 0 24 18'>
          <path class='outline' d$='${ getSidePan(diameter, opening, wallWidth, brimWidth) }'></path>
          <path class='volume' d$='${ getSideFill(diameter, opening, wallWidth, brimWidth, fillHeight) }'></path>
          <path class='line' d$='${ getSideLine(diameter, wallWidth, brimWidth, line) }'></path>
        </svg>
        
        <div class='label'>Front View</div>
        
        <div class='label'>Side View</div>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('pan-dimensions-graphic', PanDimensionsGraphic);