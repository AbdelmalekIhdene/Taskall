import React from "react";
import ReactDOM from "react-dom";
import regeneratorRuntime from "regenerator-runtime";
class Organisation extends React.Component {
	constructor(props) {
		super();
		this.state = {
			user: null,
			currentOrganisationInput: "",
			organisationNames: []
		}
		this.handleOrganisationRedirect.bind(this);
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
		if(userString !== null) {
			const user = JSON.parse(userString);
			let userName = user.profileObj.name;
			userName = userName.replace(" ", "+");
			console.log(`https://abdelmalek.ihdene.com/taskall/showOrganisations?name=${userName}`);
			this.AJAXRequest(this, "POST", `https://abdelmalek.ihdene.com/taskall/showOrganisations?name=${userName}`,
			function(instance, data){
				console.log(data);
				if(JSON.parse(data) !== null) {
					instance.setState({organisationNames: JSON.parse(data)});
				}
			});
			this.setState({user: user});
		} else {
			// Only for development, remove later!
			const userConst = '{"El":"114034582057639584483","Zi":{"token_type":"Bearer","access_token":"ya29.Il-7By5exhxxTEetusXqXx7UQ_kzNujBD5evrYTdK3iw9hFSISuq3hESiYsVELCIOl6rwkL0DSSR1Y8LnWft1G05kN0BVxw2qnfIODDdmcw2e0u75uut5EwXWehySwARQw","scope":"email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email","login_hint":"AJDLj6L2-u6giiaSGE170VbnO1bwM5UwIfWeh5YkmsBhTQMPE6RWvZdAnKhouKuGhUdTGwbbW6kuQfWCUX1-i4liqV5AFz703AG6U4MlfuJLCLDA9Q1nOxs","expires_in":3599,"id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhZDM5NzU0ZGYzYjI0M2YwNDI4YmU5YzUzNjFkYmE1YjEwZmZjYzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNzAzNDE3MjE1MzYwLWxiOXVkbnR1dm5pOWwyMWJrYmQ5a29vcnJuaTMxNDhvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNzAzNDE3MjE1MzYwLWxiOXVkbnR1dm5pOWwyMWJrYmQ5a29vcnJuaTMxNDhvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0MDM0NTgyMDU3NjM5NTg0NDgzIiwiZW1haWwiOiJhYmRlbG1hbGVrLmloZGVuZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Ijc4N0RmRkV2RnZpNlpGLXIwUUtzdUEiLCJuYW1lIjoiQWJkZWxtYWxlayBJaGRlbmUiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1JU1pFTlFrMXkyVS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQ0hpM3JkaDF6bFZlUUswQ1ZjcGNLVzZiRXRzMmJSRnlBL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJBYmRlbG1hbGVrIiwiZmFtaWx5X25hbWUiOiJJaGRlbmUiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTU3OTk4MjQ2MywiZXhwIjoxNTc5OTg2MDYzLCJqdGkiOiI4N2ZjZmM5YTYxYmMzOTcxNmQ5MzdlZjQ5NTQxZjlkMGVlZjJmYWMxIn0.N48RwMuXKBbTijkf4d8MAWsJgfCap8H2Nqj0qOEFD42ZIkCEA9os7UkYVrwXrXbYZoSQA6aJJ64bgXWKXGlW6zZvLLXgC6SCAGb_8wE-DoErExSlVlruyF5ts8roJBvzSbmVGsu5fLrrumpAQcqz1C3Gpf4x2tgYfBsmu_P-YNRx3HgRR3rwWnSFku1gGufq3HYe2gzxZ19lFRR5jUBpQkY3Ohc65cjnOcXZt2rySkwFFzVnF6VMh4f6f-1lGC0n71lpdev5e8-AQYLlkHLPqDcdcLvwiauhj9UBwaOulzQKG2u0E2ZmUOOQZDomkzTP2vHRA3bCN4SWFOD2d1TqjQ","session_state":{"extraQueryParams":{"authuser":"1"}},"first_issued_at":1579982463957,"expires_at":1579986062957,"idpId":"google"},"w3":{"Eea":"114034582057639584483","ig":"Abdelmalek Ihdene","ofa":"Abdelmalek","wea":"Ihdene","Paa":"https://lh4.googleusercontent.com/-ISZENQk1y2U/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdh1zlVeQK0CVcpcKW6bEts2bRFyA/s96-c/photo.jpg","U3":"abdelmalek.ihdene@gmail.com"},"googleId":"114034582057639584483","tokenObj":{"token_type":"Bearer","access_token":"ya29.Il-7By5exhxxTEetusXqXx7UQ_kzNujBD5evrYTdK3iw9hFSISuq3hESiYsVELCIOl6rwkL0DSSR1Y8LnWft1G05kN0BVxw2qnfIODDdmcw2e0u75uut5EwXWehySwARQw","scope":"email profile openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email","login_hint":"AJDLj6L2-u6giiaSGE170VbnO1bwM5UwIfWeh5YkmsBhTQMPE6RWvZdAnKhouKuGhUdTGwbbW6kuQfWCUX1-i4liqV5AFz703AG6U4MlfuJLCLDA9Q1nOxs","expires_in":3599,"id_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhZDM5NzU0ZGYzYjI0M2YwNDI4YmU5YzUzNjFkYmE1YjEwZmZjYzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNzAzNDE3MjE1MzYwLWxiOXVkbnR1dm5pOWwyMWJrYmQ5a29vcnJuaTMxNDhvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNzAzNDE3MjE1MzYwLWxiOXVkbnR1dm5pOWwyMWJrYmQ5a29vcnJuaTMxNDhvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0MDM0NTgyMDU3NjM5NTg0NDgzIiwiZW1haWwiOiJhYmRlbG1hbGVrLmloZGVuZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Ijc4N0RmRkV2RnZpNlpGLXIwUUtzdUEiLCJuYW1lIjoiQWJkZWxtYWxlayBJaGRlbmUiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1JU1pFTlFrMXkyVS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQ0hpM3JkaDF6bFZlUUswQ1ZjcGNLVzZiRXRzMmJSRnlBL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJBYmRlbG1hbGVrIiwiZmFtaWx5X25hbWUiOiJJaGRlbmUiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTU3OTk4MjQ2MywiZXhwIjoxNTc5OTg2MDYzLCJqdGkiOiI4N2ZjZmM5YTYxYmMzOTcxNmQ5MzdlZjQ5NTQxZjlkMGVlZjJmYWMxIn0.N48RwMuXKBbTijkf4d8MAWsJgfCap8H2Nqj0qOEFD42ZIkCEA9os7UkYVrwXrXbYZoSQA6aJJ64bgXWKXGlW6zZvLLXgC6SCAGb_8wE-DoErExSlVlruyF5ts8roJBvzSbmVGsu5fLrrumpAQcqz1C3Gpf4x2tgYfBsmu_P-YNRx3HgRR3rwWnSFku1gGufq3HYe2gzxZ19lFRR5jUBpQkY3Ohc65cjnOcXZt2rySkwFFzVnF6VMh4f6f-1lGC0n71lpdev5e8-AQYLlkHLPqDcdcLvwiauhj9UBwaOulzQKG2u0E2ZmUOOQZDomkzTP2vHRA3bCN4SWFOD2d1TqjQ","session_state":{"extraQueryParams":{"authuser":"1"}},"first_issued_at":1579982463957,"expires_at":1579986062957,"idpId":"google"},"tokenId":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhZDM5NzU0ZGYzYjI0M2YwNDI4YmU5YzUzNjFkYmE1YjEwZmZjYzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNzAzNDE3MjE1MzYwLWxiOXVkbnR1dm5pOWwyMWJrYmQ5a29vcnJuaTMxNDhvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNzAzNDE3MjE1MzYwLWxiOXVkbnR1dm5pOWwyMWJrYmQ5a29vcnJuaTMxNDhvLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE0MDM0NTgyMDU3NjM5NTg0NDgzIiwiZW1haWwiOiJhYmRlbG1hbGVrLmloZGVuZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6Ijc4N0RmRkV2RnZpNlpGLXIwUUtzdUEiLCJuYW1lIjoiQWJkZWxtYWxlayBJaGRlbmUiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1JU1pFTlFrMXkyVS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQ0hpM3JkaDF6bFZlUUswQ1ZjcGNLVzZiRXRzMmJSRnlBL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJBYmRlbG1hbGVrIiwiZmFtaWx5X25hbWUiOiJJaGRlbmUiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTU3OTk4MjQ2MywiZXhwIjoxNTc5OTg2MDYzLCJqdGkiOiI4N2ZjZmM5YTYxYmMzOTcxNmQ5MzdlZjQ5NTQxZjlkMGVlZjJmYWMxIn0.N48RwMuXKBbTijkf4d8MAWsJgfCap8H2Nqj0qOEFD42ZIkCEA9os7UkYVrwXrXbYZoSQA6aJJ64bgXWKXGlW6zZvLLXgC6SCAGb_8wE-DoErExSlVlruyF5ts8roJBvzSbmVGsu5fLrrumpAQcqz1C3Gpf4x2tgYfBsmu_P-YNRx3HgRR3rwWnSFku1gGufq3HYe2gzxZ19lFRR5jUBpQkY3Ohc65cjnOcXZt2rySkwFFzVnF6VMh4f6f-1lGC0n71lpdev5e8-AQYLlkHLPqDcdcLvwiauhj9UBwaOulzQKG2u0E2ZmUOOQZDomkzTP2vHRA3bCN4SWFOD2d1TqjQ","accessToken":"ya29.Il-7By5exhxxTEetusXqXx7UQ_kzNujBD5evrYTdK3iw9hFSISuq3hESiYsVELCIOl6rwkL0DSSR1Y8LnWft1G05kN0BVxw2qnfIODDdmcw2e0u75uut5EwXWehySwARQw","profileObj":{"googleId":"114034582057639584483","imageUrl":"https://lh4.googleusercontent.com/-ISZENQk1y2U/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdh1zlVeQK0CVcpcKW6bEts2bRFyA/s96-c/photo.jpg","email":"abdelmalek.ihdene@gmail.com","name":"Abdelmalek Ihdene","givenName":"Abdelmalek","familyName":"Ihdene"}}';
			this.setState({user: JSON.parse(userConst)});
		}
	}
	handleOrganisationInputChange = (event) => {
		this.setState({currentOrganisationInput: event.target.value});
		console.log(event.target.value);
	}
	handleOrganisationAddClick = (event) => {
		if(this.state.currentOrganisationInput.length > 0) {
			let organisationNames = [...this.state.organisationNames];
			let organisationNamesCount = organisationNames.length;
			organisationNames.push({
				id: organisationNamesCount,
				organisation: this.state.currentOrganisationInput
			});
			let userName = this.state.user.profileObj.name.replace(" ", "+");
			let organisationName = this.state.currentOrganisationInput.replace(" ", "+").replace("#", "%23");
			this.AJAXRequest(this, "POST", `https://abdelmalek.ihdene.com/taskall/addOrganisation?name=${userName}&organisation=${organisationName}`, function(instance, data){});
			this.setState({organisationNames: organisationNames});
		}
	}
	handleOrganisationDelete = (event) => {
		console.log("Hello, World!");
		let organisationNames = [...this.state.organisationNames];
		const index = event.target.getAttribute("organisation-id");
		console.log(index);
		if(confirm(`Are you sure you would like to delete the organisation ${this.state.organisationNames[index].organisation}?`)) {
			let userName = this.state.user.profileObj.name.replace(" ", "+");
			let organisationName = this.state.organisationNames[index].organisation.replace(" ", "+").replace("#", "%23");
			this.AJAXRequest(this, "POST", `https://abdelmalek.ihdene.com/taskall/removeOrganisation?name=${userName}&organisation=${organisationName}`, function(instance, data){});
			if((index + 1) === organisationNames.length || organisationNames.length === 1) {
				organisationNames.pop();
			} else {
				organisationNames.splice(index, 1);
			}
			for(var i = 0; i < organisationNames.length; i += 1) {
				organisationNames[i].id = i;
			}
			this.setState({organisationNames: organisationNames});
		}
	}
	handleOrganisationRedirect = (event) => {
		localStorage.setItem("taskall-organisation", event.currentTarget.getAttribute('value'));
		window.location.href = "./dashboard";
	}
	render() {
		return (
			<React.Fragment>
				{
					this.state.user !== null ?
					<React.Fragment>
						<section id="organisationPop">
							<section id="organisationBox">
								<h1>Hello, {this.state.user.profileObj.name}</h1>
								<section id="organisationAdd">
									<input type="text" onChange={this.handleOrganisationInputChange}></input>
									<button onClick={this.handleOrganisationAddClick}>Add Organisation</button>
								</section>
								<section id="organisationList">
									{
										this.state.organisationNames.map(organisation => {
											return (
												<React.Fragment key={organisation.id}>
													<section id="organisationListElement">
														<a onClick={this.handleOrganisationRedirect}>{organisation.organisation}</a>
														<i onClick={this.handleOrganisationDelete} organisation-id={organisation.id} className="material-icons delete">delete</i>
													</section>
													<div id="organisationListDivider"></div>
												</React.Fragment>
											);
										})
									}
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
export default Organisation;
ReactDOM.render(<Organisation/>, document.getElementById("organisationContainer"));
7
