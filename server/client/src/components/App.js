import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./landing";

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
  //invoking action creator
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container-fluid">
            <Header />
            <Switch>
              <Route path="/surveys/new" component={SurveyNew} />
              <Route path="/surveys" component={Dashboard} />
              <Route path="/" component={Landing} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App); //passing actions straight without mapDispatchToProps
