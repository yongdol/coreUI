import React, {Component} from 'react';
import {Col} from "reactstrap";
import C3Chart from "react-c3js";
import * as d3 from "d3-format";
import '../style.css';

class GraphContent extends Component {
    render() {
        const { obj, grid, i } = this.props;
        const title = obj.title;
        console.log('obj', obj);
        if (obj.tooltip) {
            if (obj.outline) {
                return (
                    <Col key={i} lg={grid} className="border-box">
                        <h2>
                            {title}
                        </h2>
                        <C3Chart data={obj.data} axis={obj.axis} point={obj.point} legend={obj.legend}
                                 grid={obj.grid} donut={obj.donut} tooltip={{format:{title: function () { return 'total sales';
                        }, value:function (value, ratio, id) {
                            return (d3.format(',')(value)) + ' 원';
                        }}}} />
                    </Col>
                )
            } else {
                return (
                    <Col key={i} lg={grid}>
                        <h2>
                            {title}
                        </h2>
                        <C3Chart data={obj.data} axis={obj.axis} point={obj.point} legend={obj.legend}
                                 grid={obj.grid} donut={obj.donut} tooltip={{format:{title: function () { return 'total sales';
                        }, value:function (value, ratio, id) {
                            return (d3.format(',')(value)) + ' 원';
                        }}}} />
                    </Col>
                )
            }
        } else {
            if (obj.outline) {
                return (
                    <Col key={i} lg={grid} className="border-box">
                        <h2>
                            {title}
                        </h2>
                        <C3Chart data={obj.data} axis={obj.axis} point={obj.point} legend={obj.legend} grid={obj.grid} donut={obj.donut} />
                    </Col>
                )
            } else {
                return (
                    <Col key={i} lg={grid}>
                        <h2>
                            {title}
                        </h2>
                        <C3Chart data={obj.data} axis={obj.axis} point={obj.point} legend={obj.legend} grid={obj.grid} donut={obj.donut} />
                    </Col>
                )
            }

        }
    }
}

export default GraphContent;
