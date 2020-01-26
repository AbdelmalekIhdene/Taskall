import React from "react";
import ReactDOM from "react-dom";
class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//user: null,
<<<<<<< HEAD
			selectedTask: 2,
			userTasks: [
				{
					id: 0,
					status: "In Progress",
=======
			selectedTask: 0,
			userTasks: [
				{
					id: 0,
					assignedBy: "Mark",
>>>>>>> 2417971ca481a27247c7657e8b834e631df491e5
					name: "Finish dashboard",
					message: "Finish the layout and interactivity",
				},
				{
					id: 1,
<<<<<<< HEAD
					status: "Not yet started",
=======
					assignedBy: "Quinn",
>>>>>>> 2417971ca481a27247c7657e8b834e631df491e5
					name: "Finish SQL",
					status: "In Progress",
					message: "Complete the dashboard and connect to front-end",
				},
				{
					id: 2,
<<<<<<< HEAD
					status: "In Progress",
=======
					assignedBy: "Joseph",
>>>>>>> 2417971ca481a27247c7657e8b834e631df491e5
					name: "Finish Login",
					message: "Have Third-Party authentication working.",
				},
				{
					id: 3,
<<<<<<< HEAD
					status: "In Progress",
=======
					assignedBy: "Joseph",
>>>>>>> 2417971ca481a27247c7657e8b834e631df491e5
					name: "Finish Organization Layout",
					message: "Finish the layout and interactivity.",
				},
				{
					id: 4,
<<<<<<< HEAD
					status: "Not yet started",
=======
					assignedBy: "Dan",
>>>>>>> 2417971ca481a27247c7657e8b834e631df491e5
					name: "Do Challenge",
					message: "Ensure that we conform to the requrements.",
				},
				{
					id: 5,
<<<<<<< HEAD
					status: "Not yet started",
=======
					assignedBy: "Mark",
>>>>>>> 2417971ca481a27247c7657e8b834e631df491e5
					name: "Test finished product",
					message: "Ensure it can be demoed.",
				}
			]
		}
	}

	handleTaskDelete = (event) => {
		console.log("Hello, World!");
		let userTasks = [...this.state.userTasks];
		const index = event.target.getAttribute("task-id");
		console.log(index);
		if(confirm(`Are you sure you would like to delete this task ${this.state.userTasks[index].name}?`)) {
			if((index + 1) === userTasks.length || userTasks.length === 1) {
				userTasks.pop();
			} else {
				userTasks.splice(index, 1);
			}
			for(var i = 0; i < userTasks.length; i += 1) {
				userTasks[i].id = i;
			}
			this.setState({userTasks: userTasks});	
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
<<<<<<< HEAD
													<i className="material-icons delete">delete</i>
=======
													<i onClick={this.handleTaskDelete} task-id={task.id} className="material-icons delete">delete</i>
>>>>>>> 2417971ca481a27247c7657e8b834e631df491e5
												</section>
												<div className="taskListDivider"></div>
											</React.Fragment>
											);}) }
										</section>
										<section id="selectedTaskElement">
											<h1>{this.state.userTasks[this.state.selectedTask].name}</h1>
<<<<<<< HEAD
											<a>Status: {this.state.userTasks[this.state.selectedTask].status}</a>
=======
											<a>Assigned By: {this.state.userTasks[this.state.selectedTask].assignedBy}</a>
>>>>>>> 2417971ca481a27247c7657e8b834e631df491e5
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