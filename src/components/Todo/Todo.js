import React, {Component} from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import TodoStore from './../../stores/TodoStore';
import * as TodoActions from './../../actions/TodoActions';

class Todo extends Component{
    constructor(props){
        super(props);
        this.state = {
            todos : TodoStore.getAll()
        }
    }

    componentWillMount(){
        TodoStore.on('change', () => {
            this.setState({
                todos : TodoStore.getAll()
            });
        });
    }

    createTodo(){
        console.log("create");
        TodoActions.createTodo(Date.now());
    }

    render(){
        let todos = this.state.todos.map( (item, index) => {
            return <ListGroupItem key={item.id} tag="a" href="#">
            { item.text}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </ListGroupItem>
        })
        return (
            <div>
                <button onClick={this.createTodo.bind(this)} className="btn btn-primary mt-3 mb-3">Create</button>
                <ListGroup flush>
                    { todos }
                </ListGroup>
            </div>
          );
    }
}

export default Todo;