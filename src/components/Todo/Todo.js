import React, {Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import TodoStore from './../../stores/TodoStore';
import * as TodoActions from './../../actions/TodoActions';
import './Todo.css';

class Todo extends Component{
    constructor(props){
        super(props);
        this.state = {
            todos : TodoStore.getAll()
        }

        this.getTodos = this.getTodos.bind(this);
    }

    componentWillMount(){
        TodoStore.on('change', this.getTodos);
        console.log("Count", TodoStore.listenerCount("change") );
    }

    componentWillUnmount(){
        TodoStore.removeListener("change", this.getTodos);
    }

    getTodos(){
        this.setState({
            todos : TodoStore.getAll()
        });
    }

    createTodo(){
        TodoActions.createTodo(Date.now());
    }

    deleteTodo( id ){
        TodoActions.deleteTodo( id );
    }

    reloadTodo( ){
        TodoActions.reloadTodo( );
    }

    render(){
        let todos = this.state.todos.map( (item, index) => {
            return <ListGroupItem key={item.id} tag="a" href="#">
            { item.text}
            <button onClick={this.deleteTodo.bind(this, item.id)} type="button" className="close">
                <span aria-hidden="true">&times;</span>
            </button>
            </ListGroupItem>
        })
        return (
            <div>
                <div className="btn-group d-flex mt-3 mb-3" role="group" aria-label="First group">
                    <button onClick={this.createTodo.bind(this)} className="btn btn-primary">Create</button>
                    <button onClick={this.reloadTodo.bind(this)} className="btn btn-primary">Reload</button>
                </div>
                <ListGroup flush>
                    { todos }
                </ListGroup>
            </div>
          );
    }
}

export default Todo;