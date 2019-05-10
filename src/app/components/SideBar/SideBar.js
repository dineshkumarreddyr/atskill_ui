import React, { Component } from "react";

import PerfectScrollbar from "react-perfect-scrollbar";
import { Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import IntlMessages from "utils/IntlMessages";

class SideBar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="main-menu">
          <div className="scroll">
            <PerfectScrollbar
              option={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav vertical className="list-unstyled">
                <NavItem>
                  <NavLink to="/dashboard">
                    <i className="iconsmind-Shop-4" />{" "}
                    <IntlMessages id="menu.dashboards" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/skill">
                    <i className="iconsmind-Green-Energy" />{" "}
                    <IntlMessages id="menu.skills" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/questionnaire">
                    <i className="iconsmind-Check-2" /> {" "}
                    <IntlMessages id="menu.questionnaire" />
                  </NavLink>
                </NavItem>
              </Nav>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
