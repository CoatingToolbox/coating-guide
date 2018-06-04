

import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store.js';


class BulkDensityChart extends connect(store)(LitElement) {
    
    ready() {
        super.ready();
        window.addEventListener('resize', () => this._setChartDimensions());
        this._setChartDimensions();
    }
    _setChartDimensions() {
        if(!this.$.chart) {
            return;
        }
        
        window.requestAnimationFrame(() => {
            this.height = this.$.chart.clientHeight - this.margin.top - this.margin.bottom;
            this.width = this.$.chart.clientWidth - this.margin.left - this.margin.right;
        });
    }
    
    static get properties() {
        return {
            bulkDensity: { type: Number},
            chart: {type: Object},
            margin: {type: Object, value: function() {
                return {top: 20, right: 20, bottom: 50, left: 20};
            }},
            references: {type: Array, value: function() {
                return [
                    { density: 760000, label: "Placebo" },
                    { density: 560000, label: "Softgels" },
                    { density: 1300000, label: "Mag Oxide" },
                    { density: 1100000, label: "Multivitamin" }
                ];}
            },
            height: {type: Number},
            width: {type: Number},
            minDensity: {type: Number, value: 250000},
            maxDensity: {type: Number, value: 1500000},
            xScale: {type: Object, computed: '_computeXScale(width)'},
            yScale: {type: Object, computed: '_computeYScale(height)'},
            d3Line: {type: Object, computed: '_computeD3Line(xScale, yScale)'},
        };
    }
    
    _computeFillVolume(volume) {
        return (volume > 0) ? volume : 0.001;
    }
    _computeXScale(chartWidth) {
        /*global d3*/
        // let max = this._convertToGML(this.maxDensity) * 1.25;
        return d3.scaleLinear().range([0, chartWidth]).domain([0, 1.75]).nice();
    }
    _computeYScale(chartHeight) {
        let max = this.maxDensity  * 1.25;
        max = this._convertToKG(max);
        return d3.scaleLinear().range([chartHeight, 0]).domain([0, max]).nice();
    }
    _computeD3Line(xScale, yScale) {
        return d3.line()
            .x(function(d) { return xScale(d.x); })
            .y(function(d) { return yScale(d.y); })
            .curve(d3.curveNatural);
    }

    static get observers() {
        return [
            '_initChart(margin, height, width)',
            '_updateAxis(xScale, yScale, chart)',
            '_updateLine(chart, d3Line)',
            '_updateFillDensityPoint(bulkDensity, chart, xScale, yScale)',
            '_updateReferencePoints(references, chart, xScale, yScale)'
        ];
    }
    
    _initChart(margin, height, width) {
        if(!margin || !height || !width) {
            return;
        }
        let chart = d3.select(this.$.chart)
                            .attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom)
                        .select(".chart")
                            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                                        
        chart.select(".x.axis").attr("transform", "translate(0," + height + ")");
        chart.select(".x.title").attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 25) + ")");
        chart.select(".y.title").attr("y", 0 - margin.left).attr("x",0 - (height / 2)).attr("dy", "1em");      
        
        // set the chart object
        this.chart = chart;
    }
    _updateAxis(xScale, yScale, chart) {
        if(!xScale || !yScale || !chart) {
            return;
        }
        chart.select(".x.axis").call(d3.axisBottom(xScale));
        // chart.select(".y.axis").call(d3.axisLeft(yScale));  
    }
    _updateLine(chart, d3Line) {
        
        if(!chart || !d3Line) { 
            return ; 
            
        }
        
        let vals = [];
        
        let step = (this.maxDensity - this.minDensity) / 10;
        
        for(var i = this.minDensity; i <= this.maxDensity; i = i + step) {
            let xValue = this._convertToGML(i);
            let yValue = this._convertToKG(i);
            vals.push({x: xValue, y: yValue});
        }
        
        let line = chart.select('.line').data([vals]);
        line.enter()
            .merge(line)
                .attr('d', d3Line);
        line.exit().remove();
    }
    _updateFillDensityPoint(fillDensity, chart, xScale, yScale) {
        if(!fillDensity || !chart || !xScale || !yScale) {
            return;
        }
        
        let vals = [{
            x: this._convertToGML(fillDensity),
            y: this._convertToKG(fillDensity)
        }];
        
        let circle = chart.selectAll('circle.fill-density').data(vals);
        
        circle.enter()
                .append('circle')
                .attr('class', 'fill-density')
              .merge(circle)
                .attr('r', 7)
                .attr('cx', function(d) { return xScale(d.x); })
                .attr('cy', function(d) { return yScale(d.y); });
                
        circle.exit().remove();
    }
    _updateReferencePoints(references, chart, xScale, yScale) {
        if(!references || !chart || !xScale || !yScale) {
            return;
            
        }
        
        let vals = [];
        
        references.forEach(val => {
            vals.push({
                x: this._convertToGML(val.density),
                y: this._convertToKG(val.density),
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

    }
    
    _convertToGML(val) {
        // convert density values to g/ml
        return (val / 1e+6);
    }
    _convertToGMLString(val) {
        // convert density values to g/ml
        return (val / 1e+6).toFixed(2);
    }
    _convertToKG(val) {
        // convert grams to kg
        return (val / 1000) ;
    }
    _convertToL(val) {
        // convert m3 to liters
        return (val / 0.001) ;
    }
    _convertToML(val) {
        // convert m3 to ml
        return (val / 1e-6) ;
    }
            
    static get template() {
        return html`
            
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                    height: 100%;
                    margin-top: 48px;
                    min-height: 196px;
                  }
                  
                  #chart {
                    flex-grow: 1;
                    /*height: 100%;*/
                    width: 100%;
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
            
            <svg id='chart' width='400'>
                <g class='chart'>
                    <g class='x axis'></g>
                    <g class='y axis'></g>
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

        