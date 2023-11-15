import {TasksStateType, todoListType} from "../App";
import {addTodoListAC, tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todolist-reducer";


//тест нужно дописать
// test("id одинаковые" , ()=>{
//     const startTasksState :TasksStateType = {
//         'todoListId1': [
//             {id: '1', title: 'js', isDone: false},
//             {id: '2', title: 'html', isDone: true},
//             {id: '3', title: 'vscode', isDone: false}
//         ],
//         'todoListId2': [
//             {id: '1', title: 'молоко', isDone: false},
//             {id: '2', title: 'сыр', isDone: true},
//             {id: '3', title: 'хлеб', isDone: false}
//         ]
//     }
//
//     const startTodolistsState :Array<todoListType> = []
//
//     const action  = addTodoListAC('new todolist' )
//
//     const endTasksState = tasksReducer(startTasksState , action)
//     const endTodoListsState = todoListsReducer(startTodolistsState , action)
//
//     let keys = Object.keys(endTasksState)
//     let idFromTasks = keys[0]
//     let idFromTodoLists = endTodoListsState[0].id
//     let newKey = keys.find(key => key != 'todoListId1' && key != "todoListId2")
//
//     if (!newKey) {
//         throw new Error("новый ключ не найден")
//     }
//
//     expect(keys.length).toBe(3)
//     expect(endState[newKey]).toEqual([])
//
// });