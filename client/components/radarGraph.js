import React, { Component } from 'react';
import { Radar } from 'react-chartjs';
import { fetchIdealMacros, fetchActualMacros } from '../actions/fetchUserData';
import { connect } from 'react-redux';

class RadarGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fat: null,
      carb: null,
      prot: null,
      n6: null
    }
  }

  componentWillMount() {
    this.props.fetchIdealMacros()
    .then(() => {
      this.setState({
        fat: this.props.idealMacros.fat,
        carb: this.props.idealMacros.carb,
        prot: this.props.idealMacros.prot,
        n6: this.props.idealMacros.n6
      })
    })
  }

  render() {

    let data = {
      labels: ["Fats", "Protein", "Carbs", "N-6"],
      datasets: [
        {
          label: "Ideal",
          fillColor: "rgba(220,0,0,0.5)",
          strokeColor: "rgba(220,0,0,0.5)",
          pointColor: "rgba(220,0,0,0.5)",
          data: [this.state.prot, this.state.carb, this.state.n6, this.state.fat]
        },
        {
          label: "Actual",
          fillColor: "rgba(0,0,220,0.5)",
          strokeColor: "rgba(0,0,220,0.5)",
          pointColor: "rgba(0,0,220,0.5)",
          data: [65, 59, 90, 47]
        }
      ]
    }

    let chartOptions = {
      scale: {
        reverse: true,
        ticks: {
          // fixedStepSize: 10
        }
      },
      pointDot : false,
    }

    if(this.props.idealMacros) {
      return (
        <div>
          <div>RADAR CHART</div>
          <Radar data={data} options={chartOptions} width="1200" height="500"/>
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    idealMacros: state.userProfile.idealMacros
    // actualMacros: state.userProfile.actualMacros
  }
}

export default connect(mapStateToProps, { fetchIdealMacros, fetchActualMacros })(RadarGraph);
