

import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';

import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { axisBottom } from 'd3-axis';
import { line, curveNatural } from 'd3-shape';


const margin = {top: 20, right: 20, bottom: 50, left: 20};
const referencePoints = [
                    { density: 0.76, label: "Placebo" },
                    { density: 0.56, label: "Softgels" },
                    { density: 1.30, label: "Mag Oxide" },
                    { density: 1.10, label: "Multivitamin" }
                ];
                
const minDensity = 0.25;
const maxDensity = 1.75;

class BulkDensityChart extends connect(store)(LitElement) {
    
    constructor() {
        super();
        window.addEventListener('resize', () => this._initChart());
    }
    _firstRendered() {
        window.requestAnimationFrame(() => this._initChart());
    }
     
    _initChart() {
        let height = this.height = this.clientHeight;
        let width = this.width = this.clientWidth;
        let adjustedHeight = height - margin.top  - margin.bottom;
        let adjustedWidth = width - margin.left  - margin.right;
            
        let chart = this.chart = select(this.shadowRoot.querySelector('#chart'))
                    .select(".chart")
                        .attr("transform", `translate( ${ margin.left }, ${ margin.top})`);
                                        
        chart.select(".x.axis").attr("transform", `translate(0, ${ adjustedHeight })`);
        chart.select(".x.title").attr("transform", `translate(${ adjustedWidth / 2}, ${adjustedHeight + margin.top + 25})`);
        
        let xScale = this.xScale = scaleLinear().range([0, adjustedWidth]).domain([0, 2]).nice();
        chart.select(".x.axis").call(axisBottom(xScale));
    
        let yScale = this.yScale = scaleLinear().range([adjustedHeight, 0]).domain([0, 2]).nice();
        
        let vals = [];
        referencePoints.forEach(val => {
            vals.push({
                x: val.density,
                y: val.density,
                label: val.label
            });
        });
        
        let circles = chart.select('.references').selectAll('circle').data(vals);
        
        circles.enter()
                    .append('circle')
                    .attr('class', 'circle')
                .merge(circles)
                    .attr('r', 4)
                    .attr('cx', function(d) { return xScale(d.x); })
                    .attr('cy', function(d) { return yScale(d.y); });
        circles.exit().remove();
        
        let text = chart.select('.references').selectAll('text').data(vals);
        
        text.enter()
            .append('text')
            .merge(text)
                .attr('x', function(d) { return xScale(d.x) + 8; })
                .attr('y', function(d) { return yScale(d.y) + 16; })
                .text(function(d) { return d.label; });
        text.exit().remove();
        
        let d3Line = this.d3Line = line()
            .x(function(d) { return xScale(d.x); })
            .y(function(d) { return yScale(d.y); })
            .curve(curveNatural);
        
        vals = [];
        
        let step = (maxDensity - minDensity) / 10;
        
        for(var i = minDensity; i <= maxDensity; i = i + step) {
            vals.push({x: i, y: i});
        }
        
        let linePath = chart.select('.line').data([vals]);
        linePath.enter()
            .merge(linePath)
                .attr('d', d3Line);
        linePath.exit().remove();
        
    }  
    static get properties() {
        return {
            density: Number,
            height: Number,
            width: Number,
            xScale: Object
        };
    }   
            
    _stateChanged(state) {
        if(!this.chart) { return; }
        let density = state.tablet.bulkDensity / 1000000;
        
        let vals = [{
            x: density,
            y: density
        }];
        
        let circle = this.chart.selectAll('circle.fill-density').data(vals);
        
        circle.enter()
                .append('circle')
                .attr('class', 'fill-density')
              .merge(circle)
                .attr('r', 7)
                .attr('cx', (d) => { return this.xScale(d.x) })
                .attr('cy', (d) => { return this.yScale(d.y) });
                
        circle.exit().remove();
    }        
    _render({ height, width }) {
        return html`
            
            <style>
                :host {
                    display: block;
                    min-height: 196px;
                    height: 100%;
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
            </style>
            
            <svg id='chart' width$=${width} height$=${height}>
                <g class='chart'>
                    <g class='x axis'></g>
                    <text class='x title'>Bulk Density (g/ml)</text>
                    <path class='dotted line'></path>
                    <g class='references'>
                        <circle class='circle'></circle>
                        <text></text>
                    </g>
                    <circle class='circle fill-density highlight'></circle>
                </g>
            </svg>
        `;
    }
    
}

customElements.define('bulk-density-chart', BulkDensityChart);

        