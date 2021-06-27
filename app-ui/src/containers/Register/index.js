import React from "react";
import { Link } from "react-router-dom";

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = { username: "", password: "", repassword: "", successMsg: "", errorMsg: "" };
    }

    conn = new WebSocket("ws://localhost:4567/register")

    componentDidMount() {
        this.conn.onmessage = (message) => {
            if (message.data === "ok") {
                this.setState({ successMsg: "Registered successfully, you can login !" });
                this.setState({ username: "" });
                this.setState({ password: "" });
                this.setState({ repassword: "" });
                return null;
            }
            this.setState({ errorMsg: message.data });
        }
    }

    componentWillUnmount() {
        this.conn.close();
    }

    register = () => {
        if (this.state.username.length > 0 && this.state.password.length > 0) {
            if (this.state.password !== this.state.repassword) {
                this.setState({ errorMsg: "Passwords do not match !" });
                return null;
            }
            this.conn.send(JSON.stringify({ username: this.state.username, password: this.state.password }));
            return null;
        }
        this.setState({ errorMsg: "Please, fill all fields !" });
    }

    handleChange = event => {
        this.setState({ errorMsg: "" });
        this.setState({ successMsg: "" });
        this.setState({ [event.target.id]: event.target.value });
    }

    render() {
        return (
            <div>
                <h1 className="text">CookBook Register</h1>
            <div className="form">
                <h2>Registration !</h2>
                <br />
                {this.state.successMsg.length > 0 && (
                    <p className="success">{this.state.successMsg}</p>
                )}
                {this.state.errorMsg.length > 0 && (
                    <p className="error">{this.state.errorMsg}</p>
                )}
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={this.state.username} onChange={this.handleChange} autoFocus autoComplete="off" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={this.state.password} onChange={this.handleChange} />
                <label htmlFor="repassword">Re-password</label>
                <input type="password" id="repassword" value={this.state.repassword} onChange={this.handleChange} />
                <button onClick={this.register}>Register</button>
                <br />
                <Link to="/login">Login</Link>
            </div>
            </div>
        );
    }

}

export default Register;
