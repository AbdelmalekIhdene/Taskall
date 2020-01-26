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
				<section id="container-login">
					<div id="title">
						<i className="material-icons lock">lock</i>
					</div>
					<h1 id="main-title"> "Welcome to TaskAll" </h1>
					<section id="Google-login">
						<GoogleLogin
							clientId="703417215360-lb9udntuvni9l21bkbd9koorrni3148o.apps.googleusercontent.com"
							buttonText="Login"
							onSuccess={this.responseGoogle}
							/* onFailure={this.responseGoogle} */
							cookiePolicy={'single_host_origin'}
						/>
					</section>
				</section>
			</React.Fragment>
		);
	}
}
export default Login;
ReactDOM.render(<Login/>, document.getElementById("loginContainer"));
