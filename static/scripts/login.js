import React from "react";
import ReactDOM from "react-dom";
import GoogleLogin from 'react-google-login';
class Login extends React.Component {
	responseGoogle(user) {
		localStorage.setItem("taskall-user-information", JSON.stringify(user));
		window.location.href = "./organisation";
	}
	render() {
		return (
			<React.Fragment>		
				<div id="container-login">
					<div id="title">
						<i class="material-icons lock">lock</i>
					</div>
				</div>
				<GoogleLogin
				clientId="703417215360-lb9udntuvni9l21bkbd9koorrni3148o.apps.googleusercontent.com"
				buttonText="Login"
				onSuccess={this.responseGoogle}
				/* onFailure={this.responseGoogle} */
				cookiePolicy={'single_host_origin'}
				/>
			</React.Fragment>
		);
	}
}
export default Login;
ReactDOM.render(<Login/>, document.getElementById("loginContainer"));
