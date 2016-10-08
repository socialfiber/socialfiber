import React, { Component } from 'react';
import TabContent from './TabContent';


class Tabs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tabsList: [],
      currentTab: null
    }
    this.changeTab.bind(this);
  }

  componentWillMount() {
    if(this.props.defaultTab) {
      this.setState({
        currentTab: this.props.defaultTab
      });
    } else {
      this.setState({
        currentTab: null
      });
    }
    if(this.props.tabsList) {
      this.setState({
        tabsList: this.props.tabsList
      });
    }
  }

  changeTab(tab) {
    if(tab !== this.state.currentTab) {
      this.setState({
        currentTab: tab
      });
    }
  }

  render() {

    const tabsList = this.state.tabsList.map((tab, idx) => {
      return (
        <li role="presentation" key={idx} onClick={()=>this.changeTab(tab.component)}><a data-toggle="tab" href={"#" + tab.label}>{tab.label}</a></li>
      );
    });
    return (
      <div>
        <nav>
          <ul className="nav nav-tabs nav-justified" role="tablist">
            {tabsList}
          </ul>
          <TabContent currentTab={this.state.currentTab} />
        </nav>
      </div>
    );

  }

}

export default Tabs;
