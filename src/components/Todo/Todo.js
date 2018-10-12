import React, {Component} from 'react';
import { ListGroup, ListGroupItem,Button, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import TodoStore from './../../stores/TodoStore';
import * as TodoActions from './../../actions/TodoActions';
import './Todo.css';

class Todo extends Component{
    constructor(props){
        super(props);
        this.state = {
            todos : TodoStore.getAll(),
            todo : "",
            todoValid : false,
            modal: false
        }
        this.getTodos = this.getTodos.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleTodoChange = this._handleTodoChange.bind(this);
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });

        this.setState({
            todo: "",
            todoValid: false
        });
    }

    _handleTodoChange(event) {
        let todo = event.target.value;
        this.setState({
            todo: todo,
            todoValid: todo.length > 3 ? true : false
        });
      }

    componentWillMount(){
        TodoStore.on('change', this.getTodos);
        // console.log("Count", TodoStore.listenerCount("change") );
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
        TodoActions.createTodo( this.state.todo );
        this.toggle();
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
                    <button onClick={this.toggle} className="btn btn-primary">Create</button>
                    <button onClick={this.reloadTodo.bind(this)} className="btn btn-primary">Reload</button>
                </div>
                <ListGroup>
                    { todos }
                </ListGroup>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Create Todo</ModalHeader>
                    <ModalBody>
                    <input className="form-control" 
                        value={this.state.todo}
                        onChange={this.handleTodoChange}
                        type="text" 
                        placeholder="todo..."/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.createTodo.bind(this)}>Save</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
          );
    }
}

export default Todo;