import React, { Component } from 'react';
import { Radar } from 'react-chartjs';

class RadarGraph extends Component {

  render() {
    let dummyData = {
      labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
      datasets: [
        {
          label: "Ideal",
          fillColor: "rgba(220,0,0,0.5)",
          strokeColor: "rgba(220,0,0,0.5)",
          pointColor: "rgba(220,0,0,0.5)",
          data: [81, 77, 44, 99, 75, 65, 69]
        },
        {
          label: "Actual",
          fillColor: "rgba(0,0,220,0.5)",
          strokeColor: "rgba(0,0,220,0.5)",
          pointColor: "rgba(0,0,220,0.5)",
          data: [65, 59, 90, 81, 56, 55, 40]
        }
      ]
    };

    let chartOptions = {
      scale: {
        reverse: true,
        ticks: {
          beginAtZero: true
        }
      },
      pointDot : false,
    }

    return (
      <div>
        <div>RADAR CHART</div>
        <Radar data={dummyData} options={chartOptions} width="600" height="250"/>
      </div>
    );
  }
}

export default RadarGraph;
