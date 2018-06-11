

import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { line, curveNatural } from 'd3-shape';

const margin = {top: 20, right: 20, bottom: 50, left: 70};
const minX = 0;
const maxX = 40; 
const minY = 0;
const maxY = 800;

const getData = (intercept, exponent) => {
    let vals = [];
    let step = (maxX - minX) / 25;
    for(var i = minX; i <= maxX; i = i + step) {
        vals.push( { solids: i, viscosity: getViscosity(i, intercept, exponent) } );
    }
    return vals;
};
const getLine = (xScale, yScale) => {
    return line()
            .x(function(d) { return xScale(d.solids); })
            .y(function(d) { return yScale(d.viscosity); })
            .curve(curveNatural);
};
const getViscosity = (solids, intercept, exponent) => {
    let v = Math.exp(solids / 100 * exponent) * intercept;
    return v;
};
class CoatingViscosityChart extends connect(store)(LitElement) {
    
    constructor() {
        super();
        window.addEventListener('resize', () => {
            window.requestAnimationFrame(() => this._initChart());
        });
        let xScale = this.xScale = scaleLinear().domain([minX, maxX]).nice();
        let yScale = this.yScale = scaleLinear().domain([minY, maxY]).nice();
        this.data = [];
        this.d3Line = getLine(xScale, yScale);
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
        let yScale = this.yScale = this.yScale.range([adjustedHeight, 0]);
        this.d3Line = getLine(xScale, yScale);
        
        let chart = this.chart = select(this.shadowRoot.querySelector('#chart'))
                    .select(".chart")
                        .attr("transform", `translate( ${ margin.left }, ${ margin.top})`);
        
        chart.select(".x.axis").attr("transform", `translate(0, ${ adjustedHeight })`);
        chart.select(".x.title").attr("transform", `translate(${ adjustedWidth / 2}, ${adjustedHeight + margin.top + 25})`);
        chart.select(".x.axis").call(axisBottom(xScale));
        
        chart.select(".y.title").attr("transform", `translate(${ 20 - margin.left}, ${ height / 2 }) rotate(-90)`);
        chart.select(".y.axis").call(axisLeft(yScale));
    }  
    
    static get properties() {
        return {
            solids: Number,
            viscosity: Number,
            data: Array,
            height: Number,
            width: Number,
            xScale: Object,
            yScale: Object,
            d3Line: Object
        };
    }   
            
    _stateChanged(state) {
        this.data = getData(state.coating.viscosityIntercept, state.coating.viscosityExponent);
        this.solids = state.coating.solids * 100;
        this.viscosity = state.coating.viscosity;
    } 
    
    _render({ height, width, xScale, yScale, solids, viscosity, d3Line, data }) {
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
                  .x.title {
                      text-anchor: middle;
                  }
                  .y.title {
                      text-anchor: start;
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
                  .reference-line {
                    fill: none;
                    stroke: var(--app-primary-color);
                    stroke-width: 3px;
                    stroke-linecap: 'round';
                    stroke-dasharray: 10;
                  }
                  .reference-circle {
                      stroke-width: 4px;
                      fill: white;
                      stroke: var(--app-accent-color);
                  }
            </style>
            
            <svg id='chart' width$=${width} height$=${height}>
                <g class='chart'>
                    <g class='x axis'></g>
                    <text class='x title'>Dispersion Solids (%)</text>
                    <g class='y axis'></g>
                    <text class='y title'>Viscosity (cps)</text>
                    <path 
                        class='reference-line'
                        d$='${ d3Line(data) }'></path>
                    <circle 
                        class='reference-circle'
                        cx$='${ xScale(solids) }'
                        cy$='${ yScale(viscosity) }'
                        r='7'>
                    </circle>
                </g>
            </svg>
        `;
    }
    
}

customElements.define('coating-viscosity-chart', CoatingViscosityChart);

        