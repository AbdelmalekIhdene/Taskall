import React from "react";
import ReactDOM from "react-dom";
class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<h1>Hello, Dashboard!</h1>
		);
	}
}
export default Dashboard;
ReactDOM.render(<Dashboard/>, document.getElementById("dashboardContainer"));
