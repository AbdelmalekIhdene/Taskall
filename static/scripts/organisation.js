import React from "react";
import ReactDOM from "react-dom";
import regeneratorRuntime from "regenerator-runtime";
class Organisation extends React.Component {
	constructor(props) {
		super();
		this.state = {
			user: null
		};
	}
	componentDidMount = async() => {
		console.log("Hello, World!");
		const userString = localStorage.getItem("taskall-user-information");
		console.log(userString);
		console.log(JSON.parse(localStorage.getItem("taskall-user-information")));
		console.log(JSON.parse(userString));
		if(userString !== null) {
			this.setState({user: JSON.parse(userString)});
			console.log(userString);
			console.log(JSON.parse(localStorage.getItem("taskall-user-information")));
			console.log(JSON.parse(userString));
		}
	}
	render() {
		return (
			<React.Fragment>
				{
					this.state.user !== null ?
					<h1>Hello, {this.state.user.profileObj.name}</h1> :
					<h1>Please login before accessing organisation</h1>
				}
			</React.Fragment>
		);
	}
}
export default Organisation;
ReactDOM.render(<Organisation/>, document.getElementById("organisationContainer"));
7