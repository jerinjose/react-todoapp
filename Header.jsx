import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';

var Header = React.createClass({
	render : function(){
		return(
			<div>
			<nav className="navbar navbar-inverse">
			  	<div className="container-fluid">
			   		 <div className="navbar-header">
			      		<a className="navbar-brand" href="myreact">My React App</a>
			    	</div>
				    <ul className="nav navbar-nav">
			     		<li activeStyle="active"><Link to="myreact">Todo</Link></li>
           				<li activeStyle="active"><Link to="home">Form</Link></li>
				    </ul>
			  	</div>
			</nav>
			<div>{this.props.children}</div>
			</div>
		);
	}

});

export default Header;
