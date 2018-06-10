

import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { axisBottom } from 'd3-axis';
import { line, curveNatural } from 'd3-shape';


const margin = {top: 20, right: 20, bottom: 50, left: 20};

const gaussian_pdf = (x, mean, sigma) => {
	var gaussianConstant = 1 / Math.sqrt(2 * Math.PI),
    x = (x - mean) / sigma;
    return gaussianConstant * Math.exp(-.5 * x * x) / sigma;
};

const computeData = (mean, stdev) => {
    let low = mean - stdev * 3;
    let high = mean + stdev * 3;
    let step = (high - low) / 100;
    
    let vals = [];
    for(let i = low; i <= high; i = i + step) {
        let temp = { x: i, y: gaussian_pdf(i, mean, stdev)};
        vals.push(temp);
    }
    return vals;
};

class TabletWeightChart extends connect(store)(LitElement) {
    
    constructor() {
        super();
        window.addEventListener('resize', () => this._initChart());
        this.xScale = scaleLinear().nice();
        this.yScale = scaleLinear().nice();
    }
    
    _firstRendered() {
        window.requestAnimationFrame(() => this._initChart());
    }
     
    _initChart() {
        let height = this.height = this.clientHeight;
        let width = this.width = this.clientWidth;
        let adjustedHeight = height - margin.top  - margin.bottom;
        let adjustedWidth = width - margin.left  - margin.right;
        
        let xScale = this.xScale = this.xScale.range([0, adjustedWidth]);
        this.yScale = this.yScale.range([adjustedHeight, 0]); 
        
        let chart = this.chart = select(this.shadowRoot.querySelector('#chart'))
                    .select(".chart").attr("transform", `translate( ${ margin.left }, ${ margin.top})`);
        
        chart.select(".x.axis").attr("transform", `translate(0, ${ adjustedHeight })`);
        chart.select(".x.title").attr("transform", `translate(${ adjustedWidth / 2}, ${adjustedHeight + margin.top + 25})`);
        chart.select(".x.axis").call(axisBottom(xScale));
    }  
    
    static get properties() {
        return {
            data: Array,
            height: Number,
            width: Number,
            xScale: Object,
            yScale: Object,
            d3Line: Object,
        };
    }   
            
    _stateChanged(state) {
        let mean = state.tablet.weight * 1000;
        let stdev = (state.tablet.weightStdev > 0) ? state.tablet.weightStdev * 1000 : 0.0000000001;
        
        let low = mean - stdev * 4;
        let high = mean + stdev * 4;
        let xScale = this.xScale = this.xScale.domain([low, high]);
        let yScale = this.yScale = this.yScale.domain([0, gaussian_pdf(mean, mean, mean * 0.015)]);
        
        this.data = computeData(mean, stdev);
        
        this.d3Line = line().x(function(d) { return xScale(d.x); })
                            .y(function(d) { return yScale(d.y); })
                            .curve(curveNatural);
        
        if(this.shadowRoot) {
            select(this.shadowRoot.querySelector('#chart')).select(".x.axis").call(axisBottom(xScale));
        }
    } 
    
    _render({ height, width, data, d3Line }) {
        return html`
            
            <style>
                :host {
                    display: block;
                    height: 100%;
                    min-height: 196px;
                    max-height: 300px;
                  }
                  #chart {
                    font-family: inherit;
                    font-size: 14px;
                    font-weight: 400;
                    letter-spacing: 0.011em;
                    line-height: 20px;
                    fill: var(--text-light-color);
                  }
                  .title {
                      text-anchor: middle;
                  }
                  .axis text {
                      font-size: 12px;
                      font-weight: 200;
                      fill: var(--text-light-color);
                  }
                  .axis line,
                  .axis .domain {
                      stroke: var(--text-light-color);
                  }
                  .line {
                    fill: var(--app-light-color);
                    stroke: var(--app-primary-color);
                    stroke-width: 3px;
                    stroke-linecap: 'round';
                  }
                  .area {
                      fill: var(--app-primary-color);
                      fill-opacity: 0.25;
                  }
                  .secondary.area {
                      fill: var(--border-color);
                  }
            </style>
            
            <svg id='chart' width$=${width} height$=${height}>
                <g class='chart'>
                    <g class='x axis'></g>
                    <text class='x title'>Tablet Weight (mg)</text>
                    <path class='line' d$=${ d3Line(data) }></path>
                </g>
            </svg>
        `;
    }
    
}

customElements.define('tablet-weight-chart', TabletWeightChart);

        