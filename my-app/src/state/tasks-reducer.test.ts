import {userReducer} from "./user-reduser";
import {v1} from "uuid";
import {FilterValuesType, TasksStateType, todoListType} from "../App";
import {
    AddTodoListAC,
    AddTodoListActionType, ChangeTodoListFilterAC, ChangeTodoListFilterActionType, ChangeTodoListTitleAC,
    ChangeTodoListTitleActionType, DeleteTodoListAC,
    DeleteTodoListActionType,
    todoListsReducer
} from "./todolist-reducer";
import {
    addTaskAC, addTodoListAC,
    changeCheckBoxStatusAC,
    changeTaskTitleAC, changeTaskTitleActionType,
    deleteTaskAC,
    DeleteTaskActionType,
    tasksReducer
} from "./tasks-reducer";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

test('проверка на то что таску можно удалить' , ()=>{
    const startState :TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'js', isDone: true},
            {id: '2', title: 'html', isDone: true},
            {id: '3', title: 'vscode', isDone: false},
            {id: '4', title: 'react', isDone: false}
        ],
        'todoListId2': [
            {id: '1', title: 'молоко', isDone: true},
            {id: '2', title: 'сыр', isDone: true},
            {id: '3', title: 'хлеб', isDone: false}
        ]
    }

    const action  = deleteTaskAC('todoListId2' , '2')

    const endState = tasksReducer(startState , action)

    expect(endState['todoListId1'].length).toBe(4) //длина 1 массива останется той же
    expect(endState['todoListId2'].length).toBe(2)  //длина массива уменьшится на 1
    expect(endState['todoListId2'].every(task => task.id != '2')).toBeTruthy()  //нет таски с айди 2
});

test('проверка на то что таску можно добавить' , ()=>{
    const startState :TasksStateType = {
        'todoListId1': [
            {id: '1', title: 'js', isDone: true},
            {id: '2', title: 'html', isDone: true},
            {id: '3', title: 'vscode', isDone: false}
        ],
        'todoListId2': [
            {id: '1', title: 'молоко', isDone: true},
            {id: '2', title: 'сыр', isDone: true},
            {id: '3', title: 'хлеб', isDone: false}
        ]
    }

    const action  = addTaskAC('сок' , 'todoListId2')

    const endState = tasksReducer(startState , action)

    expect(endState['todoListId1'].length).toBe(3)
    expect(endState['todoListId2'].length).toBe(4)
    expect(endState['todoListId2'][0].id).toBeDefined()  //проверка на то что айди вообще существует
    expect(endState['todoListId2'][0].title).toBe('сок')
    expect(endState['todoListId2'][0].isDone).toBe(false)
});

test('проверка на то что можно поменять статус чекбокса для таски' , ()=>{
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

    const action = changeCheckBoxStatusAC("2" ,false ,'todoListId2')

    const endState = tasksReducer(startState , action)

    expect(endState['todoListId2'][1].isDone).toBe(false)
    expect(endState['todoListId1'][1].isDone).toBe(true)
});

test('проверка на то что можно поменять тайтл у таски' , ()=>{
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

    const action : changeTaskTitleActionType = changeTaskTitleAC("2" ,'колбаса' ,'todoListId2')

    const endState = tasksReducer(startState , action)

    expect(endState['todoListId2'][1].title).toBe('колбаса') //новый тайтл
    expect(endState['todoListId1'][1].title).toBe('html') //осталось прежним
});

test("когда добавляется новый тудулист должно быть добавлено новое свойство с пустым массивом в обьект тасок" , ()=>{
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

    const action  = addTodoListAC('тайтл не имеет значения')

    const endState = tasksReducer(startState , action)

    let keys = Object.keys(endState)
    let newKey = keys.find(key => key != 'todoListId1' && key != "todoListId2")

    if (!newKey) {
        throw new Error("новый ключ не найден")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

});