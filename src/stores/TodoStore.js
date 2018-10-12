import {EventEmitter} from 'events';
import dispatcher from './../Dispatcher';

class TodoStore extends EventEmitter{
    constructor(){
        super();

        this.todos  = [
            {
                id : 1,
                text : "Wash the car",
                complete : false
            },
            {
                id : 2,
                text : "Go shopping",
                complete : false
            },
            {
                id : 3,
                text : "Visit grandma",
                complete : false
            },
            {
                id : 4,
                text : "Take a walk",
                complete : false
            }
        ]
    }

    getAll(){
        return this.todos;
    }

    createTodo(text){
        let id = Date.now();
        this.todos.push({
            id,
            text,
            complete: false,
        });

        this.emit('change');
    }

    reloadTodos( todos ){
        this.todos = todos
        this.emit('change');
    }

    deleteTodo(id){
        this.todos.filter( (item, index) => {
            if( id === item.id){
                this.todos.splice(index, 1);
            }

            return item;
        });

        this.emit('change');
    }

    handleAction(action){
        switch( action.type ){
            case 'CREATE_TODO':
                this.createTodo( action.text );
                break;
            case 'DELETE_TODO':
                this.deleteTodo( action.id );
                break;
            case 'RELOAD_TODO':
                this.reloadTodos( action.todos );
                break;
            default:
                this.getAll();
                break;
        }
    }
}

let todoStore = new TodoStore();
dispatcher.register(todoStore.handleAction.bind(todoStore));

export default todoStore;
