import React from 'react';

class MyReact extends React.Component {
	render() {
		return (
			<div>
				<Todo />
				{this.props.children}
			</div>	
		);
	}
}


var Todo = React.createClass({
	getInitialState: function() {
        return {item: {
           name: ''
        }}
    },
	submit : function(array){
		this.setState({item: {
            name: array
        }});
        
	},
	todoUpdate : function(array){
		this.setState({item: {
            name: array
        }});
	},

	render : function() {
		var inputCss = {
			textAlign: "center",
    		marginTop: "100px"
		};

		return (
			<div className="container"style={inputCss}>
				<TextInput 
					text = "Enter..." addData={this.submit}/>
				<TodoList dataItemslist ={this.state.item.name} update={this.todoUpdate}/>
			</div>		
		);
	}
});



var TextInput = React.createClass({
	getInitialState: function() {
		var listOfTodos = [];
		return{
			arr : listOfTodos,
			count : 1
		}
	},
	addTodo : function(){
		var count = this.state.count + 1;
		var newArray = (this.state.arr) ? this.state.arr: [];  
		newArray.push({id:count,name:this.state.value,done:false});   
		this.setState({arr:newArray,count:count});
		this.props.addData(newArray);
		this.setState({value:''});
	},

	handleChange: function(e) {
	    this.setState({ value: e.target.value});
	},


	render: function(){ 
		var count = 0;
		return (
			<div className="row">
  				<div className="col-sm-6">
  					<div className = "form-group">
						<input
							className="form-control todo-input"
		        			type="text"
							placeholder={this.props.text}
			          		value={this.state.value} 
			          		onChange={this.handleChange}/>	
	        		</div>
	        	</div>
  				<div className="col-sm-6" className="todo-button">
	  				<button type="button" className="btn btn-primary" onClick={this.addTodo}>
	  					Add Todo
	  				</button>
  				</div>
			</div>
			
	        		
		)
	}

});


var TodoList = React.createClass({
	getInitialState: function() {
		return{
			items : []
		}
	},
	changeCheckboxClk : function(val,e){
		var todoList = this.props.dataItemslist;
  		for(var i=0;i < todoList.length;i++){
  			if(val == this.props.dataItemslist[i].id){
  				todoList[i].done = !todoList[i].done;
  			}
  		}
  		this.props.update(todoList);
  	},
  	remove : function(val,e){
  		var todoList = this.props.dataItemslist;
  		for(var i=0;i < todoList.length;i++){
  			if(val == this.props.dataItemslist[i].id){
  				todoList.splice(i, 1);
  			}
  		}
  		this.props.update(todoList);
  	},

	render: function(){ 
		var lists = (this.props.dataItemslist) ? this.props.dataItemslist : [];
		
		return (
			<div className="container todo-list">
		      	<ul className="hide-bullet">
		      		{ lists.map(function(todo) {
		      			var className = (todo.done) ? 'linethrough' : '';
		                return(
		                	<li key={todo.id}>
		                		<div className="row">
	  								<div className="col-sm-6 todo-row"> 
				                		<div className="checkbox">
											<label className={className}>
												<input type="checkbox" onChange={this.changeCheckboxClk.bind(this,todo.id)} checked={todo.done}/>
												{todo.name}
											</label>
										</div>
									</div>
									<div className="col-sm-6 todo-button"> 	
		                				<button className="btn btn-danger" onClick={this.remove.bind(this,todo.id)}>Remove</button>
		                			</div>
		                		</div>			
		                	</li>
		                	)
		              }, this)}
		      	</ul>
		    </div>  	
	    )
	}

});

export default MyReact;
