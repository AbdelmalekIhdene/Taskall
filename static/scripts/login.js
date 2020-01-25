import React from "react";
import ReactDOM from "react-dom";
class Login extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<h1>Hello, Login!</h1>
		);
	}
}
export default Login;
ReactDOM.render(<Login/>, document.getElementById("loginContainer"));
