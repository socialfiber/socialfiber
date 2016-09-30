import React, { Component } from 'react';
import { Radar } from 'react-chartjs';
import { fetchMacros } from '../actions/fetchUserData';
import { connect } from 'react-redux';

class RadarGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idealMacros: {
        fat: null,
        carb: null,
        prot: null,
        n6: null
      },
      actualMacros: {
        fat: null,
        carb: null,
        prot: null,
        n6: null
      }
    }
  }

  componentWillMount() {
    this.props.fetchMacros()
    .then(() => {
      this.setState({
        idealMacros: {
          fat: this.props.idealMacros.fat,
          carb: this.props.idealMacros.carb,
          prot: this.props.idealMacros.prot,
          n6: this.props.idealMacros.n6
        },
        actualMacros: {
          fat: Math.floor(this.props.actualMacros.fat),
          carb: Math.floor(this.props.actualMacros.carb),
          prot: Math.floor(this.props.actualMacros.prot),
          n6: Math.floor(this.props.actualMacros.n6)
        }
      })
      console.log("ideal fat: ", this.state.idealMacros.fat)
      console.log("actual fat: ", this.state.actualMacros.fat)
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
          data: [this.state.idealMacros.prot, this.state.idealMacros.carb, this.state.idealMacros.n6, this.state.idealMacros.fat]
        },
        {
          label: "Actual",
          fillColor: "rgba(0,0,220,0.5)",
          strokeColor: "rgba(0,0,220,0.5)",
          pointColor: "rgba(0,0,220,0.5)",
          data: [this.state.actualMacros.prot, this.state.actualMacros.carb, this.state.actualMacros.n6, this.state.actualMacros.fat]
        }
      ]
    }

    let chartOptions = {
      scale: {
        reverse: true
      },
      pointDot : false,
    }

    if(this.state.idealMacros.fat) {
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
    idealMacros: state.userProfile.idealMacros,
    actualMacros: state.userProfile.actualMacros
  }
}

export default connect(mapStateToProps, { fetchMacros })(RadarGraph);
