import {userReducer} from "./user-reduser";
import {v1} from "uuid";
import {FilterValuesType, todoListType} from "../App";
import {
    AddTodoListActionType, ChangeTodoListFilterAC, ChangeTodoListFilterActionType, ChangeTodoListTitleAC,
    ChangeTodoListTitleActionType, DeleteTodoListAC,
    DeleteTodoListActionType,
    todoListsReducer
} from "./todolist-reducer";
import {addTodoListAC} from "./tasks-reducer";

test('проверка на то что тудулист можно удалить' , ()=>{
    let todoListId1 = v1()
    let todoListId2 = v1()

    const startState :Array<todoListType> = [
        {id: todoListId1, title: "what to learn", filter: 'all'},
        {id: todoListId2, title: "продукты", filter: 'all'}
    ]


    const endState = todoListsReducer(startState , DeleteTodoListAC(todoListId1))

    expect(endState.length).toBe(1)  //длина массива уменьшится на 1
    expect(endState[0].id).toBe(todoListId2)  //первый элемент имеет id todoListId2
});

test('проверка на то можно добавить новый тудулист' , ()=>{
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newTodoListTitle = "new todolist"

    const startState :Array<todoListType> = [
        {id: todoListId1, title: "what to learn", filter: 'all'},
        {id: todoListId2, title: "продукты", filter: 'all'}
    ]

    let action = addTodoListAC(newTodoListTitle)

    const endState: Array<todoListType> = todoListsReducer(startState ,action)

    expect(endState.length).toBe(3)  //длина массива должна быть 3
    expect(endState[2].title).toBe(newTodoListTitle)  //3 элеметт имеет тайтл newTodoListTitle
});

test('проверка на то что у тудулиста можно менять тайтл' , ()=>{
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newTodoListTitle = "changed todolist title"

    const action:ChangeTodoListTitleActionType = ChangeTodoListTitleAC(newTodoListTitle ,todoListId2 )

    const startState :Array<todoListType> = [
        {id: todoListId1, title: "what to learn", filter: 'all'},
        {id: todoListId2, title: "продукты", filter: 'all'}
    ]

    const endState: Array<todoListType> = todoListsReducer(startState , action)

    expect(endState[0].title).toBe("what to learn")
    expect(endState[1].title).toBe(newTodoListTitle)
});

test('проверка на то что у тудулиста можно менять фильтр' , ()=>{
    let todoListId1 = v1()
    let todoListId2 = v1()

    let newTodoListFilter : FilterValuesType = "active"

    const startState :Array<todoListType> = [
        {id: todoListId1, title: "what to learn", filter: 'all'},
        {id: todoListId2, title: "продукты", filter: 'all'}
    ]

    let action: ChangeTodoListFilterActionType = ChangeTodoListFilterAC(todoListId2  , newTodoListFilter )

    const endState: Array<todoListType> = todoListsReducer(startState , action)

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newTodoListFilter)
});