import dispatcher from '../Dispatcher';

export function createTodo(text){
    dispatcher.dispatch({
        type : 'CREATE_TODO',
        text
    });
}

export function deleteTodo(id){
    dispatcher.dispatch({
        type : 'DELETE_TODO',
        id
    });
}

export function reloadTodo(id){
    dispatcher.dispatch({type: "FETCH_TODO"});

    //Mock a service call.
    setTimeout(()=>{
        dispatcher.dispatch({
            type : 'RELOAD_TODO',
            todos : [
                {
                    id : 5,
                    text : "Go shopping 1",
                    complete : false
                },
                {
                    id : 6,
                    text : "Visit grandma 1",
                    complete : false
                }
            ]
        });
    },1000);

    dispatcher.dispatch({type: "FETCH_TODO_ERROR"});
}