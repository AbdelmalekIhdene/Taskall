import React from "react";
import ReactDOM from "react-dom";
class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//user: null,
			selectedTask: 2,
			userTasks: [
				{
					id: 0,
					status: "In Progress",
					name: "Finish dashboard",
					message: "Finish the layout and interactivity",
				},
				{
					id: 1,
					status: "Not yet started",
					name: "Finish SQL",
					status: "In Progress",
					message: "Complete the dashboard and connect to front-end",
				},
				{
					id: 2,
					status: "In Progress",
					name: "Finish Login",
					message: "Have Third-Party authentication working.",
				},
				{
					id: 3,
					status: "In Progress",
					name: "Finish Organization Layout",
					message: "Finish the layout and interactivity.",
				},
				{
					id: 4,
					status: "Not yet started",
					name: "Do Challenge",
					message: "Ensure that we conform to the requrements.",
				},
				{
					id: 5,
					status: "Not yet started",
					name: "Test finished product",
					message: "Ensure it can be demoed.",
				}
			]
		}
	}
	render() {
		return (
			<React.Fragment>
				{
					this.state.user !== null ?
					<React.Fragment>
						<section id="dashboard">
    						<h1 id="pageTitle">Welcome to Your Dashboard</h1>
    							<React.Fragment>
        							<section id="dashboardBox">
										{/*<nav id="dashboardNavBar">
											<ul>
												<li><a href="#mytasks">My Tasks</a></li>
												<li><a href="#tasksent">Tasks Sent</a></li>
												<li><a href="#members">Members</a></li>
												<li><a href="#addmember">Add Members</a></li>
												<li><a href="#newtask"></a>New Task</li>
											</ul>
										</nav>*/}
										<section id="dashboardTaskList">
											{ this.state.userTasks.map(task => { return (
											<React.Fragment key={task.id}>
												<section id="taskListElement">
													<a>{task.name}</a>
													<i className="material-icons delete">delete</i>
												</section>
												<div className="taskListDivider"></div>
											</React.Fragment>
											);}) }
										</section>
										<section id="selectedTaskElement">
											<h1>{this.state.userTasks[this.state.selectedTask].name}</h1>
											<a>Status: {this.state.userTasks[this.state.selectedTask].status}</a>
											<a>Details: {this.state.userTasks[this.state.selectedTask].message}</a>
										</section>
									</section>
							</React.Fragment>
						</section>
					</React.Fragment> :
					<React.Fragment>
						<h1>Please login before accessing organisation</h1>
					</React.Fragment>
				}
			</React.Fragment>
		);
	}
}
export default Dashboard;
ReactDOM.render(<Dashboard/>, document.getElementById("dashboardContainer"));
