import React, {Component} from 'react';
import {render} from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class FoodDiary extends Component {
  constructor(props){
    super(props)
    this.state{
      diaryEntry: ''
    }
  }


  render(){
    return (

    <div>
      <h1>Food Diary </h1>
        <p>Please write what you ate meal by meal ex: cheeseburger with french fries</p>
        <input value={this.state.diaryEntry}></input>
        <input type = 'submit' value = 'Create' className='btn btn-primary' onSubmit={this.submitFoodDiaryEntry}/>
    </div>
    )
  }
}
