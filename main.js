import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';
import Header from './Header.jsx';
import Home from './Home.jsx';
import MyReact from './App.jsx';



ReactDOM.render((
	<Router history = {browserHistory}>
      <Route path = "/" component = {Header}>
         <IndexRoute component = {MyReact} />
         <Route path = "myreact" component = {MyReact} />
         <Route path = "home" component = {Home} />
      </Route>
   </Router>
), document.getElementById('app'));
