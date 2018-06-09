
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

class PanDepthGraphic extends connect(store)(LitElement) {
  
  static get properties () {
    return {
      view: String,
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
  
  _render ({ diameter, opening, fillHeight, wallWidth, brimWidth }) {
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
          --pan-color: #F2F2F2;
          --pan-outline-color: var(--text-light-color);
          --pan-fill-color: var(--app-light-color, #FF514B);
        }
        
        .graphic {
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
      </style>
      
        <svg class='graphic' viewbox='0 0 24 18'>
          <path class='outline' d$='${ getSidePan(diameter, opening, wallWidth, brimWidth) }'></path>
          <path class='volume' d$='${ getSideFill(diameter, opening, wallWidth, brimWidth, fillHeight) }'></path>
        </svg>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('pan-depth-graphic', PanDepthGraphic);