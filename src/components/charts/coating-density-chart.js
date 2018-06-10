

import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { axisBottom } from 'd3-axis';
import { line, curveNatural } from 'd3-shape';


const margin = {top: 20, right: 20, bottom: 50, left: 20};
                
const minDensity = 0;
const maxDensity = 5;

const setReferencePoints = (chart, xScale, yScale) => {
    
    let referencePoints = [
        { density: 1.01, label: "Acrylics" },
        // { density: 1.14, label: "Ethocel" },
        { density: 1.15, label: "PVA" },
        { density: 1.3, label: "HPMC" },
        { density: 1.54, label: "Sugars" },
        { density: 2.5, label: "Lakes" },
        { density: 2.75, label: "Talc" },
        { density: 4.2, label: "Oxides" },
        { density: 4.23, label: "TiO2" }
    ];
        
    let circles = chart.select('.references').selectAll('circle').data(referencePoints);
    
    circles.enter()
                .append('circle')
                .attr('class', 'circle')
            .merge(circles)
                .attr('r', 4)
                .attr('cx', function(d) { return xScale(d.density); })
                .attr('cy', function(d) { return yScale(d.density); });
    circles.exit().remove();
    
    let text = chart.select('.references').selectAll('text').data(referencePoints);
    
    text.enter()
        .append('text')
        .merge(text)
            .attr('x', function(d) { return xScale(d.density) + 8; })
            .attr('y', function(d) { return yScale(d.density) + 16; })
            .text(function(d) { return d.label; });
    text.exit().remove();
};

const setReferenceLine = (chart, xScale, yScale) => {
    let d3Line = line()
        .x(function(d) { return xScale(d.density); })
        .y(function(d) { return yScale(d.density); })
        .curve(curveNatural);
    
    let vals = [];
    
    let step = (maxDensity - minDensity) / 10;
    
    for(var i = minDensity; i <= maxDensity; i = i + step) {
        vals.push( { density: i } );
    }
    
    let linePath = chart.select('.line').data([vals]);
    linePath.enter()
        .merge(linePath)
            .attr('d', d3Line);
    linePath.exit().remove();
};

class CoatingDensityChart extends connect(store)(LitElement) {
    
    constructor() {
        super();
        window.addEventListener('resize', () => this._initChart());
        this.xScale = scaleLinear().domain([minDensity, maxDensity]).nice();
        this.yScale = scaleLinear().domain([minDensity, maxDensity]).nice();
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
        
        let chart = this.chart = select(this.shadowRoot.querySelector('#chart'))
                    .select(".chart")
                        .attr("transform", `translate( ${ margin.left }, ${ margin.top})`);
        
        chart.select(".x.axis").attr("transform", `translate(0, ${ adjustedHeight })`);
        chart.select(".x.title").attr("transform", `translate(${ adjustedWidth / 2}, ${adjustedHeight + margin.top + 25})`);
        chart.select(".x.axis").call(axisBottom(xScale));
        
        setReferencePoints(chart, xScale, yScale);
        setReferenceLine(chart, xScale, yScale);
    }  
    
    static get properties() {
        return {
            density: Number,
            height: Number,
            width: Number,
            xScale: Object,
            yScale: Object
        };
    }   
            
    _stateChanged(state) {
        this.density = state.coating.filmDensity / 1000000;
    } 
    _render({ height, width, xScale, yScale, density }) {
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
                  .y.title {
                      transform: rotate(-90deg);
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
                    fill: none;
                    stroke: var(--app-primary-color);
                    stroke-width: 3px;
                    stroke-linecap: 'round';
                  }
                  .secondary.line {
                    stroke: var(--border-color);
                  }
                  .dotted.line {
                    stroke-dasharray: 10;
                  }
                  .area {
                      fill: var(--app-primary-color);
                      fill-opacity: 0.25;
                  }
                  .secondary.area {
                      fill: var(--border-color);
                  }
                  .circle {
                      stroke: var(--app-primary-color);
                      stroke-width: 4px;
                      fill: white;
                  }
                  .circle.highlight {
                    stroke: var(--app-accent-color);
                  }
                  .references text {
                      font-size: 12px;
                      color: var(--text-light-color);
                      fill: var(--text-light-color);
                  }
                  .references text:nth-of-type(odd) {
                      text-anchor: end;
                      transform: translate(-16px, -20px);
                  }
            </style>
            
            <svg id='chart' width$=${width} height$=${height}>
                <g class='chart'>
                    <g class='x axis'></g>
                    <text class='x title'>True Density (g/ml)</text>
                    <path class='dotted line'></path>
                    <g class='references'>
                        <circle class='circle'></circle>
                    </g>
                    <circle 
                        class='circle fill-density highlight'
                        cx$='${ xScale(density) }'
                        cy$='${ yScale(density) }'
                        r='7'>
                    </circle>
                </g>
            </svg>
        `;
    }
    
}

customElements.define('coating-density-chart', CoatingDensityChart);

        