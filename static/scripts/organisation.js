import React from "react";
import ReactDOM from "react-dom";
class Organisation extends React.Component {
	constructor(props) {
		super();
		this.state = {
			user: null
		};
	}
	componentDidMount() {
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
					<h1>Hello, {this.state.user.name}</h1> :
					<h1>Please login before accessing organisation</h1>
				}
			</React.Fragment>
		);
	}
}
export default Organisation;
ReactDOM.render(<Organisation/>, document.getElementById("organisationContainer"));
