
import React from 'react';

class Home extends React.Component {

	render() {
		return (
			<div>
				<Users />
				{this.props.children}
			</div>	
		)
	}	
	
}

export default Home;


var Users = React.createClass({

	getInitialState:function(){
		return {
			users : []
		}
	},

	setUserData : function(userArray){
		this.setState({
			users : userArray
		});
	},

   	render : function() {
      return (
         <div>
        	<InputForm getUserData = {this.setUserData}/>
        	<UserList userlist = {this.state.users}/>
         </div>
      )
   }
});



var TextInput = React.createClass({
	getInitialState : function(){
		return {
			value : '',
			errorMsg : '',
			error : '',
			name : ''
		}
	},

	validate : function(type,e){
		var valid = true;;
		var errorMsg = '';
		var value = e.target.value;
		var emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		var userObj = {name:'',email:''};

		if(this.props.required){
			valid = (value.length > 0) ? true : false;
			errorMsg = (valid == true) ? "" : "Required";
		}

		if(value.length < this.props.minChara){
			errorMsg = (valid == true) ? "" : "Minimum characters is "+this.props.minChara+" required.";
		}


		if(valid && type == 'email'){
			valid = (emailPattern.test(value) == true) ? true : false;
			errorMsg = (valid == true) ? "" : "Email is invalid";
		}
		if(type=='name')
			this.props.setUserName(value);

		if(type=='email')
			this.props.setUserEmail(value);

		this.setState({
			value : e.target.value,
			error : valid,
			msg : errorMsg,
			name : type
		});


	},

	render : function(){
		return(
			<div>
				<input
					className="form-control"
	    			type={this.props.type}
					placeholder={this.props.placeholder}
	          		value={this.state.value}
	          		onChange={this.validate.bind(this,this.props.name)} />	
	          	<span className="errorMsg"><p>{this.state.msg}</p></span>
	        </div>  		
		)
	}
});


var InputForm = React.createClass({

	getInitialState : function(){
		return {
			usersArray : [],
			count : 0,
			userEmail : '',
			userName : ''
		}
	},

	clearInput : function(){

	},

	addUser : function(){
		var userTempArray = (this.state.usersArray) ? this.state.usersArray : [];
		var count  = this.state.count;
		userTempArray.push({id:count+1 ,email: this.state.userEmail,name : this.state.userName});
		this.setState({
			usersArray : userTempArray,
			count : count+1
		});
		this.props.getUserData(userTempArray);
		this.clearInput();
	},
	setUserEmail : function(email){

		var name = (this.state.userName) ? this.state.userName : '';
		this.setState({
			userName : name,
			userEmail : email
		});

	},

	setUserName : function(name){

		var email = (this.state.userEmail) ? this.state.userEmail : '';
		this.setState({
			userName : name,
			userEmail : email
		});
	},
	render : function(){
		return (
			<div>
	          	<div className="row">
		  			<div className="col-sm-4">
		  				<div className = "form-group">
							<TextInput type="text" placeholder="Name" required={true} minChara={4} name="name" setUserName = {this.setUserName}/>
			        	</div>
			        </div>
			        <div className="col-sm-4">
		  				<div className = "form-group">
							<TextInput type="email" placeholder="Email" required={true} name="email" setUserEmail = {this.setUserEmail}/>
			        	</div>
			        </div>
	  				<div className="col-sm-4">
		  				<button type="button" className="btn btn-primary" onClick={this.addUser}>
		  					Add User
		  				</button>
	  				</div>
				</div>	
			</div>
		)
	}
});

var UserList = React.createClass({
	render : function(){
		var UserList = (this.props.userlist) ? this.props.userlist : [];
		return(
		    <div className="container user-list">
			  	<h2>Users</h2>
			  	<table className="table">
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Email</th>
						</tr>
					</thead>
			    <tbody>
			    	{ UserList.map(function(user) {
			    		return(
				      	<tr key={user.id}>
				      		<td>{user.id}</td>
					        <td>{user.name}</td>
					        <td>{user.email}</td>
				      	</tr>)
		            }, this)}  	
			    </tbody>
			  </table>
			</div>
	
		)
	}
});