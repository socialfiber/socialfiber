import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMacros } from '../../actions/users';
import { Radar } from 'react-chartjs';
import _ from 'underscore';


class RadarGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      idealMacros: null,
      actualMacros: null
    }
  }

  componentWillMount() {
    this.setState({
      idealMacros: this.props.idealMacros || {
        fat: 0,
        fat_min: 0,
        fat_max: 0,
        carb: 0,
        carb_min: 0,
        carb_max: 0,
        prot: 0,
        prot_min: 0,
        prot_max: 0,
        fib: 0,
        n6: 0,
        n6_min: 0,
        n6_max: 0
      }
    });
    // if(this.props.date === undefined && this.state.actualMacros !== null && this.props.actualMacros.length) {
    //   var allMacros;
    //   for(var total of actualMacros) {
    //     allMacros[fat] = allMacros.fat+actualMacros[total].fat || actualMacros[total].fat;
    //     console.log(allMacros, total)
    //   }
    //   console.log(allMacros)
    //   this.setState({
    //     actualMacros: {}
    //   })
    // } else {
      this.setState({
        actualMacros: _.findWhere(this.props.actualMacros, {date: this.props.date}) || this.props.actualMacros[0] || {
          fat: 0,
          carb: 0,
          prot: 0,
          fib: 0,
          n6: 0
        }
      })
    // }
  }

  componentWillUnmount() {
    this.setState({
      idealMacros: null,
      actualMacros: null
    })
  }

  render() {

    var height, width;
    switch(this.props.size) {
      case 'small':
        height = 250;
        width = 250;
        break;
      case 'medium':
        height = 375;
        width = 375;
        break;
      case 'large':
        height = 500;
        width = 500;
    }

    if(this.props.type === 'amount') {

      const data = {
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

      const chartOptions = {
        scale: {
          reverse: true,
          ticks: {
            beginAtZero: true,
          }
        },
        scaleShowLabels: false,
        scaleOverride: true,
        scaleSteps: 13,
        scaleStepWidth: 10,
        pointDot : false
      }

      return (
        <div>
          <Radar data={data} options={chartOptions} width={width} height={height} />
        </div>
      );

    } else if(this.props.type === 'ratio') {

      const totalMacros = this.state.actualMacros.fat+this.state.actualMacros.prot+this.state.actualMacros.carb+this.state.actualMacros.n6 || 1;

      const data = {
        labels: ["Fats %", "Protein %", "Carbs %", "N-6 %"],
        datasets: [
          {
            label: "Min %",
            fillColor: "rgba(220,0,0,0.5)",
            strokeColor: "rgba(220,0,0,0.5)",
            pointColor: "rgba(220,0,0,0.5)",
            data: [(this.state.idealMacros.fat_min*100).toFixed(2), (this.state.idealMacros.prot_min*100).toFixed(2), (this.state.idealMacros.carb_min*100).toFixed(2), (this.state.idealMacros.n6_min*100).toFixed(2)]
          },
          {
            label: "Max %",
            fillColor: "rgba(0,0,220,0.5)",
            strokeColor: "rgba(0,0,220,0.5)",
            pointColor: "rgba(0,0,220,0.5)",
            data: [(this.state.idealMacros.fat_max*100).toFixed(2), (this.state.idealMacros.prot_max*100).toFixed(2), (this.state.idealMacros.carb_max*100).toFixed(2), (this.state.idealMacros.n6_max*100).toFixed(2)]
          },
          {
            label: "Actual %",
            fillColor: "rgba(0,220,0,0.5)",
            strokeColor: "rgba(0,220,0,0.5)",
            pointColor: "rgba(0,220,0,0.5)",
            data: [(this.state.actualMacros.fat/totalMacros).toFixed(2), (this.state.actualMacros.prot/totalMacros).toFixed(2), (this.state.actualMacros.carb/totalMacros).toFixed(2), (this.state.actualMacros.n6/totalMacros).toFixed(2)]
          }
        ]
      }

      const chartOptions = {
        scale: {
          reverse: true,
          ticks: {
            beginAtZero: true,
          }
        },
        scaleShowLabels: false,
        scaleOverride: true,
        scaleSteps: 15,
        scaleStepWidth: 5,
        pointDot : false
      }
      
      return (
        <div>
          <Radar data={data} options={chartOptions} width={width} height={height} />
        </div>
      );

    } else {

      return (
        <p>No data available.</p>
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
