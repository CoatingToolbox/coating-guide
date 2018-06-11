

import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

import { select } from 'd3-selection';
import { arc } from 'd3-shape';


const margin = {top: 50, right: 50, bottom: 50, left: 50};
const innerRadius = 0.8;
class PanVolumeChart extends connect(store)(LitElement) {
    
    constructor() {
        super();
        window.addEventListener('resize', () => this._initChart());
        this.arc = arc().startAngle(0).innerRadius(10 * innerRadius).outerRadius(10);
        this.circle = arc().startAngle(0).innerRadius(0).outerRadius(10 * innerRadius);
    }
    
    _firstRendered() {
        window.requestAnimationFrame(() => this._initChart());
    }
     
    _initChart() {
        let height = this.height = this.clientHeight;
        let width = this.width = this.clientWidth;
        let adjustedHeight = height - margin.top  - margin.bottom;
        let adjustedWidth = width - margin.left  - margin.right;
        
        select(this.shadowRoot.querySelector('#chart'))
                    .select(".chart")
                        .attr("transform", `translate( ${ adjustedWidth / 2 + margin.left }, ${ adjustedHeight / 2 + margin.top})`);
        
    
        this.arc = arc()
                    .startAngle(0)
                    .innerRadius(adjustedHeight * innerRadius)
                    .outerRadius(adjustedHeight);
                    
        this.circle = arc()
                    .startAngle(0)
                    .innerRadius(0)
                    .outerRadius(adjustedHeight * innerRadius);
        
    }  
    
    
    static get properties() {
        return {
            height: Number,
            width: Number,
            arc: Object,
            circle: Object,
            volume: Number,
            percent: Number,
            label: String,
            path: String
        };
    }   
            
    _stateChanged(state) {
      let volume = this.volume = state.pan[this.path];
      let brim = state.pan.brimVolume;
      this.percent = volume / brim;
    } 
    _render({ height, width, volume, label, arc, circle, percent }) {
        return html`
            
            <style>
                :host {
                    display: block;
                    height: 196px;
                    width: 196px;
                    margin: 32px;
                  }
                  #chart {
                    font-family: inherit;
                    font-size: 14px;
                    font-weight: 400;
                    letter-spacing: 0.011em;
                    line-height: 20px;
                    fill: var(--text-light-color);
                  }
                  .background-arc {
                      fill: var(--border-color);
                  }
                  .highlight-arc {
                      fill: var(--app-dark-color);
                  }
                  .background-circle {
                      fill: var(--app-primary-color);
                  }
                  .opacity-circle {
                      fill: var(--white-color);
                  }
                  text {
                      text-anchor: middle;
                      font-size: 32px;
                      fill: var(--app-dark-color);
                  }
                  .subtitle {
                      font-size: 20px;
                  }
                  :host([highlight]) .highlight-arc,
                  :host([highlight]) text {
                      fill: var(--app-accent-color);
                  }
            </style>
            
            <svg id='chart' width$=${width} height$=${height}>
                <g class='chart'>
                    <path class='background-arc' d$='${ arc({endAngle: Math.PI * 2}) }'></path>
                    <path class='highlight-arc' d$='${ arc({endAngle: Math.PI * 2 * percent}) }'></path>
                    <text x='' y='15'>${(volume * 1000).toFixed(1) } L</text>
                    <text x='' y='-17' class='subtitle'>${ label }</text>
                </g>
            </svg>
        `;
    }
    
}

customElements.define('pan-volume-chart', PanVolumeChart);

        