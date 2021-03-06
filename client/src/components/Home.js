import React, { Component, Fragment } from "react";
import axios from "axios";
import Registration from "./auth/Registration";
import Login from "./auth/Login";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/dashboard");
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("Logout Error", error);
      });
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        {
          (this.props.loggedInStatus === "LOGGED_IN") ?
            (
              <button onClick={() => this.handleLogoutClick()}>Logout</button>
            ) :
            (
              <Fragment>
                <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
                <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
              </Fragment>
            )
        }
      </div>
    );
  }
}
