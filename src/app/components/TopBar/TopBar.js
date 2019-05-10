import React, { Component } from "react";
import {
  Input,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap";
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

import "./TopBar.scss";

import profilePic from "assets/img/profile-pic-l.jpg";

class TopBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInFullScreen: false
    };

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "https://auth.atskill.com";
  };
  render() {
    const notifications = [];
    return (
      <nav className="navbar fixed-top topBarContainer">
        <NavLink to="#" className="menu-button d-none d-md-block">
          <svg
            className="main"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 9 17"
          >
            <rect x="0.48" y="0.5" width="7" height="1" />
            <rect x="0.48" y="7.5" width="7" height="1" />
            <rect x="0.48" y="15.5" width="7" height="1" />
          </svg>
          <svg
            className="sub"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 17"
          >
            <rect x="1.56" y="0.5" width="16" height="1" />
            <rect x="1.56" y="7.5" width="16" height="1" />
            <rect x="1.56" y="15.5" width="16" height="1" />
          </svg>
        </NavLink>

        <div className="search" data-search-path="/app/layouts/search">
          <Input name="searchKeyword" id="searchKeyword" />
          <span className="search-icon">
            <i className="simple-icon-magnifier" />
          </span>
        </div>

        <a className="navbar-logo" href="/">
          <span className="logo d-none d-md-block" />
          <span className="logo-mobile d-block d-md-none" />
        </a>

        <div className="ml-auto">
          <div className="header-icons d-inline-block align-middle">
            <div className="position-relative d-inline-block">
              <UncontrolledDropdown className="dropdown-menu-right">
                <DropdownToggle
                  className="header-icon notificationButton"
                  color="empty"
                >
                  <i className="simple-icon-bell" />
                </DropdownToggle>
                <DropdownMenu
                  className="position-absolute mt-3 scroll"
                  right
                  id="notificationDropdown"
                >
                  <PerfectScrollbar
                    option={{ suppressScrollX: true, wheelPropagation: false }}
                  >
                    {notifications.map((n, index) => {
                      return (
                        <div
                          key={index}
                          className="d-flex flex-row mb-3 pb-3 border-bottom"
                        >
                          <a href="/app/layouts/details">
                            <img
                              src={n.image}
                              alt="Notification"
                              className="img-thumbnail list-thumbnail xsmall border-0 rounded-circle"
                            />
                          </a>
                          <div className="pl-3 pr-2">
                            <a href="/app/layouts/details">
                              <p className="font-weight-medium mb-1">
                                {n.message}
                              </p>
                              <p className="text-muted mb-0 text-small">
                                {n.date}
                              </p>
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </PerfectScrollbar>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <button
              className="header-icon btn btn-empty d-none d-sm-inline-block"
              type="button"
              id="fullScreenButton"
              onClick={this.toggleFullScreen}
            >
              {this.state.isInFullScreen ? (
                <i className="simple-icon-size-actual d-block" />
              ) : (
                <i className="simple-icon-size-fullscreen d-block" />
              )}
            </button>
          </div>
        </div>

        <div className="user d-inline-block">
          <UncontrolledDropdown className="dropdown-menu-right">
            <DropdownToggle className="p-0" color="empty">
              <span className="name mr-1">Welcome User</span>
              <span>
                <img alt="Profile" src={profilePic} />
              </span>
            </DropdownToggle>
            <DropdownMenu className="mt-3" right>
              <DropdownItem>Account</DropdownItem>
              <DropdownItem>Features</DropdownItem>
              <DropdownItem>History</DropdownItem>
              <DropdownItem>Support</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => this.handleLogout()}>
                Sign out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </nav>
    );
  }
}

export default TopBar;
