import React, {Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

class NavBar extends Component {
  constructor(props){
    super(props)
    this.state={}
  }

  render(){
    return(
      <Navbar>
          <Nav>
            <NavItem><Link to='/signin'>Sign In </Link> </NavItem>
            <NavItem><Link to='/signup'>Sign Up </Link> </NavItem>
            <NavItem><Link to='/UserQuestionnaire'>Update Questionnaire</Link></NavItem>
            <NavItem><Link to='/userProfile'>Profile</Link></NavItem>
            <NavItem><Link to='/foodDiary'> Food Diary</Link></NavItem>
            <NavItem><Link to='/viewallgroups'> All Groups</Link></NavItem>
            <NavItem><Link to='/mygroups'> My Groups</Link></NavItem>
            <NavItem><Link to='/creategroup'> Create a Group</Link></NavItem>
          </Nav>
      </Navbar>
    )
  }
}


export default NavBar;
