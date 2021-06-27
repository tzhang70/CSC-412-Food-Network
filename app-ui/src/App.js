import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./helpers/PrivateRoute";
import Main from "./containers/Main";
import Login from "./containers/Login";
import Register from "./containers/Register";
import "./App.css";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  render() {
    return (
      <Router>
        <PrivateRoute exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Router>
    );
  }
}

export default App;