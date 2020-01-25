import React from "react";
import ReactDOM from "react-dom";
class Organisation extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<h1>Hello, Organisation!</h1>
		);
	}
}
export default Organisation;
ReactDOM.render(<Organisation/>, document.getElementById("organisationContainer"));
