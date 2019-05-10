import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import { Button } from "reactstrap";

import User from "../../../engine/User";

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.navigate = this.navigate.bind(this);
  }

  navigate() {
    this.props.history.push("/assets");
  }
  componentDidMount() {
    this.props.fetchUserDetails();
  }
  render() {
    const myUserDetail = this.props.user;
    const renderedUI =
      (myUserDetail && (
        <div key={myUserDetail.id}>
          <p>My user name: {myUserDetail.name}</p>
          <p>My user name: {myUserDetail.email}</p>

          <Button color="primary" onClick={this.navigate}>
            Navigate to assets
          </Button>
        </div>
      )) ||
      "";

    return renderedUI;
  }
}

UserDetail.propTypes = {
  fetchUserDetails: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: User.selectors.user(state)
});

export default connect(
  mapStateToProps,
  { fetchUserDetails: User.actions.fetchUsers }
)(withRouter(UserDetail));
