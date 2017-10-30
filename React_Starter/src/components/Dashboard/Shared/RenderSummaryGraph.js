import React, {Component} from 'react';
import {Bar, Doughnut, Line, Pie, Polar, Radar} from "react-chartjs-2";

class RenderSummaryGraph extends Component {
  render() {
    const {type, data, options} = this.props;
    switch (type) {
      case "bar":
        return (
          <Bar data={data} options={options}/>
        );
      case "pie":
        return (
          <Pie data={data} options={options}/>
        );
      case "line":
        return (
          <Line data={data} options={options}/>
        );
      case "doughnut":
        return (
          <Doughnut data={data} options={options}/>
        );
      case "radar":
        return(
          <Radar data={data} options={options}/>
        );
      case "polar":
        return(
          <Polar data={data} options={options}/>
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
