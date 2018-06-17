

import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

import { select } from 'd3-selection';
import { arc } from 'd3-shape';


const margin = {top: 50, right: 50, bottom: 50, left: 50};
const innerRadius = 0.95;
class CoatingOpacityChart extends connect(store)(LitElement) {
    
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
            opacity: Number
        };
    }   
            
    _stateChanged(state) {
        this.opacity = state.coatingAmount.filmOpacity;
    } 
    _render({ height, width, arc, circle, opacity }) {
        return html`
            
            <style>
                :host {
                    display: block;
                    height: 100%;
                    height: 196px;
                    max-heigt: 200px;
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
                      font-size: 48px;
                      fill: var(--app-dark-color);
                  }
                  .percent {
                      font-weight: 32px;
                  }
                  .subtitle {
                      font-size: 20px;
                  }
            </style>
            
            <svg id='chart' width$=${width} height$=${height}>
                <g class='chart'>
                    <path class='background-arc' d$='${ arc({endAngle: Math.PI * 2}) }'></path>
                    <path class='background-circle' d$='${ circle({endAngle: Math.PI * 2}) }'></path>
                    <path class='highlight-arc' d$='${ arc({endAngle: (opacity * Math.PI * 2)}) }'></path>
                    <path class='opacity-circle' d$='${ circle({endAngle: Math.PI * 2}) }' style=' opacity: ${opacity}'></path>
                    <text x='' y='25'>${(opacity * 100).toFixed(1) }</text>
                    <text x='' y='-25' class='subtitle'>Opacity</text>
                </g>
            </svg>
        `;
    }
    
}

customElements.define('coating-opacity-chart', CoatingOpacityChart);

        