import {TasksStateType, todoListType} from "../App";
import {addTodoListAC, tasksReducer} from "./tasks-reducer";
import {DeleteTodoListAC, todoListsReducer} from "./todolist-reducer";


test("id одинаковые" , ()=>{
    const startTasksState :TasksStateType = {}
    const startTodolistsState :Array<todoListType> = []


    const action  = addTodoListAC('new todolist' )

    const endTasksState = tasksReducer(startTasksState , action)
    const endTodoListsState = todoListsReducer(startTodolistsState , action)

    let keys = Object.keys(endTasksState)
    let idFromTasks = keys[0]
    let idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todoListId)
    expect(idFromTodoLists).toBe(action.todoListId)

});

test("когда тудулист удаляют должно удалится свойсвто из массива тасок по которому раньше лежали все дела" , ()=>{
    const startState :TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'js', isDone: false},
            {id: '2', title: 'html', isDone: true},
            {id: '3', title: 'vscode', isDone: false}
        ],
        'todoListId2': [
            {id: '1', title: 'молоко', isDone: false},
            {id: '2', title: 'сыр', isDone: true},
            {id: '3', title: 'хлеб', isDone: false}
        ]
    }


    const action  = DeleteTodoListAC('todoListId2' )

    const endState = tasksReducer(startState , action)

    let keys = Object.keys(endState)


    expect(keys.length).toBe(1)
    expect(endState["todoListId2"]).toBe(undefined)

});

