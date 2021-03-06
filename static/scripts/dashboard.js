import React from "react";
import ReactDOM from "react-dom";
import regeneratorRuntime from "regenerator-runtime";
class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			selectedOrganisation: "",
			currentTaskName: "",
			currentAssignee: "",
			currentDescription: "",
			selectedTask: 0,
			userTasks: [
				// {
				// 	id: 0,
				// 	assignedTo: "Mark",
				// 	assignedBy: "Mark",
				// 	name: "Finish dashboard",
				// 	message: "Finish the layout and interactivity",
				// },
				// {
				// 	id: 1,
				// 	assignedTo: "Mark",
				// 	assignedBy: "Quinn",
				// 	name: "Finish SQL",
				// 	message: "Complete the dashboard and connect to front-end",
				// },
				// {
				// 	id: 2,
				// 	assignedTo: "Mark",
				// 	assignedBy: "Joseph",
				// 	name: "Finish Login",
				// 	message: "Have Third-Party authentication working.",
				// },
				// {
				// 	id: 3,
				// 	assignedTo: "Mark",
				// 	assignedBy: "Joseph",
				// 	name: "Finish Organization Layout",
				// 	message: "Finish the layout and interactivity.",
				// },
				// {
				// 	id: 4,
				// 	assignedTo: "Mark",
				// 	assignedBy: "Dan",
				// 	name: "Do Challenge",
				// 	message: "Ensure that we conform to the requrements.",
				// },
				// {
				// 	id: 5,
				// 	assignedTo: "Mark",
				// 	assignedBy: "Mark",
				// 	name: "Test finished product",
				// 	message: "Ensure it can be demoed.",
				// }
			]
		}
	}
	AJAXRequest = (reference, method, url, success) => {
		var xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.onreadystatechange = function() {
			if(xhr.readyState > 3 && xhr.status == 200) {
				success(reference, xhr.responseText);
			}
		}
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xhr.send();
		return xhr;
	}
	componentDidMount = async() => {
		const userString = localStorage.getItem("taskall-user-information");
		const organisationString = localStorage.getItem("taskall-organisation");
		console.log(organisationString);
		if(userString !== null) {
			const user = JSON.parse(userString);
			let assignee = user.profileObj.name.replace(" ", "+");
			let organisation = organisationString;
			organisation = organisation.replace(" ", "+");
			assignee = assignee.replace(" ", "+");
			this.AJAXRequest(this, "POST", `https://abdelmalek.ihdene.com/taskall/showTasks?assignee=${assignee}&organisation=${organisation}`,
			function(instance, data){
				if(JSON.parse(data) !== null) {
					instance.setState({userTasks: JSON.parse(data)});
				}
			});
			this.setState({user: user});
		} else {
			// Only for development, remove later!
			const userConst = '{"El":"114034582057639584483","Zi":{"token_type":"Bearer","access_token":"ya29.Il-7By5exhxxTEetusXqXx7UQ_kzNujBD5evrYTdK3iw9hFSISuq3hESiYsVELCIOl6rwkL0DSSR1Y8LnWft1G05kN0BVxw2qnfIODDdmcw2e0u75uut5EwXWehySwARQw","scope":"email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email","login_hint":"AJDLj6L2-u6giiaSGE170VbnO1bwM5UwIfWeh5YkmsBhTQMPE6RWvZdAnKhouKuGhUdTGwbbW6kuQfWCUX1-i4liqV5AFz703AG6U4MlfuJLCLDA9Q1nOxs","expires_in":3599,"id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhZDM5NzU0ZGYzYjI0M2YwNDI4YmU5YzUzNjFkYmE1YjEwZmZjYzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNzAzNDE3MjE1MzYwLWxiOXVkbnR1dm5pOWwyMWJrYmQ5a29vcnJuaTMxNDhvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNzAzNDE3MjE1MzYwLWxiOXVkbnR1dm5pOWwyMWJrYmQ5a29vcnJuaTMxNDhvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0MDM0NTgyMDU3NjM5NTg0NDgzIiwiZW1haWwiOiJhYmRlbG1hbGVrLmloZGVuZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Ijc4N0RmRkV2RnZpNlpGLXIwUUtzdUEiLCJuYW1lIjoiQWJkZWxtYWxlayBJaGRlbmUiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1JU1pFTlFrMXkyVS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQ0hpM3JkaDF6bFZlUUswQ1ZjcGNLVzZiRXRzMmJSRnlBL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJBYmRlbG1hbGVrIiwiZmFtaWx5X25hbWUiOiJJaGRlbmUiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTU3OTk4MjQ2MywiZXhwIjoxNTc5OTg2MDYzLCJqdGkiOiI4N2ZjZmM5YTYxYmMzOTcxNmQ5MzdlZjQ5NTQxZjlkMGVlZjJmYWMxIn0.N48RwMuXKBbTijkf4d8MAWsJgfCap8H2Nqj0qOEFD42ZIkCEA9os7UkYVrwXrXbYZoSQA6aJJ64bgXWKXGlW6zZvLLXgC6SCAGb_8wE-DoErExSlVlruyF5ts8roJBvzSbmVGsu5fLrrumpAQcqz1C3Gpf4x2tgYfBsmu_P-YNRx3HgRR3rwWnSFku1gGufq3HYe2gzxZ19lFRR5jUBpQkY3Ohc65cjnOcXZt2rySkwFFzVnF6VMh4f6f-1lGC0n71lpdev5e8-AQYLlkHLPqDcdcLvwiauhj9UBwaOulzQKG2u0E2ZmUOOQZDomkzTP2vHRA3bCN4SWFOD2d1TqjQ","session_state":{"extraQueryParams":{"authuser":"1"}},"first_issued_at":1579982463957,"expires_at":1579986062957,"idpId":"google"},"w3":{"Eea":"114034582057639584483","ig":"Abdelmalek Ihdene","ofa":"Abdelmalek","wea":"Ihdene","Paa":"https://lh4.googleusercontent.com/-ISZENQk1y2U/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdh1zlVeQK0CVcpcKW6bEts2bRFyA/s96-c/photo.jpg","U3":"abdelmalek.ihdene@gmail.com"},"googleId":"114034582057639584483","tokenObj":{"token_type":"Bearer","access_token":"ya29.Il-7By5exhxxTEetusXqXx7UQ_kzNujBD5evrYTdK3iw9hFSISuq3hESiYsVELCIOl6rwkL0DSSR1Y8LnWft1G05kN0BVxw2qnfIODDdmcw2e0u75uut5EwXWehySwARQw","scope":"email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email","login_hint":"AJDLj6L2-u6giiaSGE170VbnO1bwM5UwIfWeh5YkmsBhTQMPE6RWvZdAnKhouKuGhUdTGwbbW6kuQfWCUX1-i4liqV5AFz703AG6U4MlfuJLCLDA9Q1nOxs","expires_in":3599,"id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhZDM5NzU0ZGYzYjI0M2YwNDI4YmU5YzUzNjFkYmE1YjEwZmZjYzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNzAzNDE3MjE1MzYwLWxiOXVkbnR1dm5pOWwyMWJrYmQ5a29vcnJuaTMxNDhvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNzAzNDE3MjE1MzYwLWxiOXVkbnR1dm5pOWwyMWJrYmQ5a29vcnJuaTMxNDhvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0MDM0NTgyMDU3NjM5NTg0NDgzIiwiZW1haWwiOiJhYmRlbG1hbGVrLmloZGVuZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Ijc4N0RmRkV2RnZpNlpGLXIwUUtzdUEiLCJuYW1lIjoiQWJkZWxtYWxlayBJaGRlbmUiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1JU1pFTlFrMXkyVS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQ0hpM3JkaDF6bFZlUUswQ1ZjcGNLVzZiRXRzMmJSRnlBL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJBYmRlbG1hbGVrIiwiZmFtaWx5X25hbWUiOiJJaGRlbmUiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTU3OTk4MjQ2MywiZXhwIjoxNTc5OTg2MDYzLCJqdGkiOiI4N2ZjZmM5YTYxYmMzOTcxNmQ5MzdlZjQ5NTQxZjlkMGVlZjJmYWMxIn0.N48RwMuXKBbTijkf4d8MAWsJgfCap8H2Nqj0qOEFD42ZIkCEA9os7UkYVrwXrXbYZoSQA6aJJ64bgXWKXGlW6zZvLLXgC6SCAGb_8wE-DoErExSlVlruyF5ts8roJBvzSbmVGsu5fLrrumpAQcqz1C3Gpf4x2tgYfBsmu_P-YNRx3HgRR3rwWnSFku1gGufq3HYe2gzxZ19lFRR5jUBpQkY3Ohc65cjnOcXZt2rySkwFFzVnF6VMh4f6f-1lGC0n71lpdev5e8-AQYLlkHLPqDcdcLvwiauhj9UBwaOulzQKG2u0E2ZmUOOQZDomkzTP2vHRA3bCN4SWFOD2d1TqjQ","session_state":{"extraQueryParams":{"authuser":"1"}},"first_issued_at":1579982463957,"expires_at":1579986062957,"idpId":"google"},"tokenId":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhZDM5NzU0ZGYzYjI0M2YwNDI4YmU5YzUzNjFkYmE1YjEwZmZjYzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNzAzNDE3MjE1MzYwLWxiOXVkbnR1dm5pOWwyMWJrYmQ5a29vcnJuaTMxNDhvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNzAzNDE3MjE1MzYwLWxiOXVkbnR1dm5pOWwyMWJrYmQ5a29vcnJuaTMxNDhvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0MDM0NTgyMDU3NjM5NTg0NDgzIiwiZW1haWwiOiJhYmRlbG1hbGVrLmloZGVuZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Ijc4N0RmRkV2RnZpNlpGLXIwUUtzdUEiLCJuYW1lIjoiQWJkZWxtYWxlayBJaGRlbmUiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1JU1pFTlFrMXkyVS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQ0hpM3JkaDF6bFZlUUswQ1ZjcGNLVzZiRXRzMmJSRnlBL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJBYmRlbG1hbGVrIiwiZmFtaWx5X25hbWUiOiJJaGRlbmUiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTU3OTk4MjQ2MywiZXhwIjoxNTc5OTg2MDYzLCJqdGkiOiI4N2ZjZmM5YTYxYmMzOTcxNmQ5MzdlZjQ5NTQxZjlkMGVlZjJmYWMxIn0.N48RwMuXKBbTijkf4d8MAWsJgfCap8H2Nqj0qOEFD42ZIkCEA9os7UkYVrwXrXbYZoSQA6aJJ64bgXWKXGlW6zZvLLXgC6SCAGb_8wE-DoErExSlVlruyF5ts8roJBvzSbmVGsu5fLrrumpAQcqz1C3Gpf4x2tgYfBsmu_P-YNRx3HgRR3rwWnSFku1gGufq3HYe2gzxZ19lFRR5jUBpQkY3Ohc65cjnOcXZt2rySkwFFzVnF6VMh4f6f-1lGC0n71lpdev5e8-AQYLlkHLPqDcdcLvwiauhj9UBwaOulzQKG2u0E2ZmUOOQZDomkzTP2vHRA3bCN4SWFOD2d1TqjQ","accessToken":"ya29.Il-7By5exhxxTEetusXqXx7UQ_kzNujBD5evrYTdK3iw9hFSISuq3hESiYsVELCIOl6rwkL0DSSR1Y8LnWft1G05kN0BVxw2qnfIODDdmcw2e0u75uut5EwXWehySwARQw","profileObj":{"googleId":"114034582057639584483","imageUrl":"https://lh4.googleusercontent.com/-ISZENQk1y2U/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdh1zlVeQK0CVcpcKW6bEts2bRFyA/s96-c/photo.jpg","email":"abdelmalek.ihdene@gmail.com","name":"Abdelmalek Ihdene","givenName":"Abdelmalek","familyName":"Ihdene"}}';
			this.setState({user: JSON.parse(userConst)});
		}
		if(organisationString !== null) {
			this.setState({selectedOrganisation: organisationString});
		}
	}

	handleTaskClick = (event) => {
		console.log("Clicked a task");
		let userTasks = [...this.state.userTasks];
		this.state.selectedTask = event.target.getAttribute("task-id");
		console.log("Selected Task: " + this.state.selectedTask);
		this.setState({userTasks: userTasks});
	}

	handleTaskDelete = (event) => {
		console.log("Clicked delete");
		let userTasks = [...this.state.userTasks];
		const index = event.target.getAttribute("task-id");
		if(confirm(`Are you sure you would like to delete the task ${this.state.userTasks[index].name}?`)) {
			let userName = this.state.userTasks[index].assignedBy;
			let organisationName = this.state.userTasks[index].organisation;
			let assignee = this.state.userTasks[index].assignedTo;
			let taskName = this.state.userTasks[index].name;
			let description = this.state.userTasks[index].message;
			this.AJAXRequest(this, "POST", `https://abdelmalek.ihdene.com/taskall/removeTask?username=${userName}&organisation=${organisationName}&taskname=${taskName}&assignee=${assignee}&description=${description}`, function(instance, data){});
			if((index + 1) === userTasks.length || userTasks.length === 1) {
				userTasks.pop();
			} else {
				userTasks.splice(index, 1);
			}
			for(var i = 0; i < userTasks.length; i += 1) {
				userTasks[i].id = i;
			}
			this.setState({userTasks: userTasks, selectedTask: 0});
		}
	}

	handleTaskNameChange = (event) => {
		this.setState({currentTaskName: event.target.value});
	}

	handleAssigneeChange = (event) => {
		this.setState({currentAssignee: event.target.value});
	}

	handleDescriptionChange = (event) => {
		this.setState({currentDescription: event.target.value});
	}

	handleAssignTaskClick = (event) => {
		console.log(this.state.currentTaskName);
		console.log(this.state.currentAssignee);
		console.log(this.state.currentDescription);
		let name = this.state.currentAssignee.replace(" ", "+");
		let userName = this.state.user.profileObj.name.replace(" ", "+").replace("#", "%23");
		let organisationName = this.state.selectedOrganisation.replace(" ", "+").replace("#", "%23");
		let taskName = this.state.currentTaskName.replace(" ", "+").replace("#", "%23");
		let assignee = this.state.currentAssignee.replace(" ", "+").replace("#", "%23");
		let description = this.state.currentDescription.replace(" ", "+").replace("#", "%23");
		console.log(`https://abdelmalek.ihdene.com/taskall/addOrganisation?name=${name}&organisation=${organisationName}`);
		// this.AJAXRequest(this, "POST", `https://abdelmalek.ihdene.com/taskall/removeOrganisation?name=${userName}&organisation=${organisationName}`, function(instance, data){});
		this.AJAXRequest(this, "POST", `https://abdelmalek.ihdene.com/taskall/addOrganisation?name=${name}&organisation=${organisationName}`, function(instance, data){});
		this.AJAXRequest(this, "POST", `https://abdelmalek.ihdene.com/taskall/addTask?username=${userName}&organisation=${organisationName}&taskname=${taskName}&assignee=${assignee}&description=${description}`, function(instance, data){});
		if(this.state.currentAssignee === this.state.user.profileObj.name) {
			let userTasks = [...this.state.userTasks];
			let userTasksCount = userTasks.length;
			userTasks.push({
				id: userTasksCount,
				assignedBy: this.state.user.profileObj.name,
				assignedTo: this.state.currentAssignee,
				name: this.state.currentTaskName,
				message: this.state.currentDescription
			});
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
							<h1 id="pageTitle">{this.state.selectedOrganisation} Dashboard</h1>
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
											{ this.state.userTasks.map(task => {
											return (
												<React.Fragment key={task.id}>
													<section id="taskListElement">
														<a onClick={this.handleTaskClick} task-id={task.id}>{task.name}</a>
														<i onClick={this.handleTaskDelete} task-id={task.id} className="material-icons delete">delete</i>
													</section>
													<div className="taskListDivider"></div>
												</React.Fragment>
											);}) }
										</section>
										{
											this.state.userTasks.length > 0 ?
											<section id="selectedTaskElement">
												<h1>{this.state.userTasks[this.state.selectedTask].name}</h1>
												<a><strong>Assigned By:</strong><br></br>{this.state.userTasks[this.state.selectedTask].assignedBy}</a>
												<a><strong>Description:</strong><br></br>{this.state.userTasks[this.state.selectedTask].message}</a>
											</section> :
											<section id="selectedTaskElement">
												<h1 id="noTaskLabel">No Tasks Currently Selected or Available :)</h1>
											</section>
										}
									</section>
							</React.Fragment>
							<section id="taskAssign">
								<section id="inputContainer">
									<input onChange={this.handleTaskNameChange} placeholder="Task Name" type="text"></input>
									<input onChange={this.handleAssigneeChange} placeholder="Assign To" type="text"></input>
								</section>
								<textarea onChange={this.handleDescriptionChange} placeholder="Description..." rows="4"></textarea>
								<section id="assignCenter">
									<button onClick={this.handleAssignTaskClick}>Assign Task</button>
								</section>
							</section>
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
