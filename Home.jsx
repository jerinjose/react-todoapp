
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
					className="form-control todo-input"
	    			type={this.props.type}
					placeholder={this.props.placeholder}
	          		value={this.state.value}
	          		onChange={this.validate.bind(this,this.props.name)} />	

	          	<h3>{this.state.msg}</h3>
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
		userTempArray.push({id:count+1 ,name: this.state.userEmail,email : this.state.userName});
		this.setState({
			userName : '',
			userEmail : '',
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
	  				<div className="col-sm-4" className="todo-button">
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
			<div>
		      	<ul className="hide-bullet">
		      		{ UserList.map(function(user) {
		                return(
		                	<li key={user.id}>{user.name}</li>
		                	)
		              }, this)}
		      	</ul>
		    </div>  	
		)
	}
});