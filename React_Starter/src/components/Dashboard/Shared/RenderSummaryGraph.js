import React, {Component} from 'react';
import {Bar, Line, Pie} from "react-chartjs-2";

class RenderSummaryGraph extends Component {
    render() {
        const {type, data, options} = this.props;
        switch (type) {
            case "bar" :
                return (
                    <Bar data={data} options={options}/>
                );

            case "pie" :
                return (
                    <Pie data={data} options={options}/>
                );
            case "line" :
                return (
                    <Line data={data} options={options}/>
                );
            default :
                return (
                    <div>
                        Error!
                    </div>
                )

        }
    }
}


export default RenderSummaryGraph;
