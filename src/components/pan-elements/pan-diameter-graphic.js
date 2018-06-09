
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

class PanDiameterGraphic extends connect(store)(LitElement) {
  
  static get properties () {
    return {
      view: String,
      line: String,
      diameter: Number,
      opening: Number,
      fillHeight: Number
    };
  }
  constructor() {
    super();
  }
  _stateChanged(state) {
    this.diameter = state.pan.mainDiameter;
    this.opening = state.pan.openingDiameter;
    this.fillHeight = state.pan.brimHeight;
  }
  
  _render ({ diameter, opening, fillHeight }) {
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
          <path class='outline' d$='${ getFrontPan(diameter) }'></path>
          <path class='volume' d$='${ getFrontFill(diameter, fillHeight) }'></path>
          <path class='outline' d$='${ getFrontPan(opening) }'></path>
        </svg>
    `;
  }
}

// Register the element with the browser.
/* global customElements */
customElements.define('pan-diameter-graphic', PanDiameterGraphic);