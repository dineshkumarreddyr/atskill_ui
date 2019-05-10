import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import TopBar from "../components/TopBar/TopBar";
import SideBar from "../components/SideBar/SideBar";
import Dashboard from "./Dashboard";
import Skill from "./Skill";
import Questionnaire from "../Questionnaire/questionnaire";

export default class Base extends Component {
  render() {
    const { match } = this.props;

    return (
      <Fragment>
        <div id="app-container" className="menu-default menu-sub-hidden">
          <TopBar />
          <SideBar />
          <main>
            <div className="container-fluid">
              <div className="dashboard-wrapper">
                <Switch>
                  <Route path={`${match.url}dashboard`} component={Dashboard} />
                  <Route path={`${match.url}skill`} component={Skill} />
                  <Route
                    path={`${match.url}questionnaire`}
                    component={Questionnaire}
                  />
                  <Redirect to={`${match.url}skill`} />
                </Switch>
              </div>
            </div>
          </main>
        </div>
      </Fragment>
    );
  }
}
