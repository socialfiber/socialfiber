import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMacros } from '../../actions/users';
import { Radar } from 'react-chartjs';


class RadarGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idealMacros: {
        fat: null,
        carb: null,
        prot: null,
        fib: null,
        n6: null
      },
      actualMacros: {
        fat: null,
        carb: null,
        prot: null,
        fib: null,
        n6: null
      }
    }
  }

  componentWillMount() {
    this.props.fetchMacros(this.props.userID)
    .then(() => {
      // console.log("actual macros: ", this.props.actualMacros);
      this.setState({
        idealMacros: {
          fat: this.props.idealMacros.fat,
          carb: this.props.idealMacros.carb,
          prot: this.props.idealMacros.prot,
          fib: this.props.idealMacros.fib,
          n6: this.props.idealMacros.n6
        },
        actualMacros: {
          // If food diary is empty set actual macros to 0
          fat: this.props.actualMacros ? Math.floor(this.props.actualMacros.fat) : 0,
          carb: this.props.actualMacros ? Math.floor(this.props.actualMacros.carb) : 0,
          prot: this.props.actualMacros ? Math.floor(this.props.actualMacros.prot) : 0,
          fib: this.props.actualMacros ? Math.floor(this.props.actualMacros.fib) : 0,
          n6: this.props.actualMacros ? Math.floor(this.props.actualMacros.n6) : 0
        }
      })
    })
  }

  render() {

    let data = {
      labels: ["Fats", "Protein", "Fiber", "Carbs", "N-6"],
      datasets: [
        {
          label: "Ideal",
          fillColor: "rgba(220,0,0,0.5)",
          strokeColor: "rgba(220,0,0,0.5)",
          pointColor: "rgba(220,0,0,0.5)",
          data: [this.state.idealMacros.fat, this.state.idealMacros.prot, this.state.idealMacros.fib, this.state.idealMacros.carb, this.state.idealMacros.n6]
        },
        {
          label: "Actual",
          fillColor: "rgba(0,0,220,0.5)",
          strokeColor: "rgba(0,0,220,0.5)",
          pointColor: "rgba(0,0,220,0.5)",
          data: [this.state.actualMacros.fat, this.state.actualMacros.prot, this.state.actualMacros.fib, this.state.actualMacros.carb, this.state.actualMacros.n6]
        }
      ]
    }

    let chartOptions = {
      scale: {
        reverse: true,
        ticks: {
          beginAtZero: true,
        }
      },
      scaleShowLabels: true,
      scaleOverride: true,
      scaleSteps: 13,
      scaleStepWidth: 10,
      pointDot : false
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
