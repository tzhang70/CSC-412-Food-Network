import React from "react";
import { Link } from "react-router-dom";
import { format } from "path";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { username: "", password: "", errorMsg: "", passwordMsg: "" };
    }

    conn = new WebSocket("ws://localhost:4567/login")

    componentDidMount() {
        this.conn.onmessage = (message) => {
            if (message.data === "ok") {
                localStorage.setItem("authToken", true);
                localStorage.setItem("username", this.state.username);
                this.props.history.push("/");

                return null;
            }
            if (message.data === "Error #1") {
                this.setState({ errorMsg: "Username does not exist !" });
                this.setState({password: ""});
                return null;
            }
            if (message.data === "Error #2") {
                this.setState({ errorMsg: "Invalid Username/Password"});
                this.setState({password: ""});
                return null;
            }
            this.setState({ passwordMsg: "Hello, " + this.state.username + ", your password is : \" " + message.data + " \"" });
        }
    }

    componentWillUnmount() {
        this.conn.close();
    }

    login = () => {
        if (this.state.username.length > 0 && this.state.password.length > 0) {
            this.conn.send(JSON.stringify({ "username": this.state.username, "password": this.state.password }));
            return null;
        }
        this.setState({ errorMsg: "Please, fill all fields !" });
    }
    
    forgotPassword = () => {
        if (this.state.username.length > 0) {
            this.conn.send(JSON.stringify({ "username": this.state.username, "password": 'ForgotPassword123' }));
            return null;
        }
        this.setState({ errorMsg: "Please, enter your username !" });
    }

    handleChange = event => {
        this.setState({ errorMsg: "" });
        this.setState({ [event.target.id]: event.target.value });
    }

    render() {
        return (
            
            <div>
                <h1 className="text">CookBook Login</h1>
                <div className="form">
                <h2>Please, log in !</h2>
                <br />
                {this.state.errorMsg.length > 0 && (
                    <p className="error">{this.state.errorMsg}</p>
                )}
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={this.state.username} onChange={this.handleChange} autoFocus autoComplete="off" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={this.state.password} onChange={this.handleChange} />
                <button type="botton" onClick={this.login}>Login</button>
                <br />
                <div>
                <Link to="/register">Register</Link>
                <Link style={{marginLeft:'42%'}} onClick={this.forgotPassword}>Forgot Password</Link>
                </div>
                {this.state.passwordMsg.length > 0 && (
                    <p className="error">{this.state.passwordMsg}</p>
                )}
                </div>
            </div>
        );
    }
}

export default Login;
