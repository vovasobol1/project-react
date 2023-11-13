import {FilterValuesType, todoListType} from "../App";
import {v1} from "uuid";

export type DeleteTodoListActionType = {
    type : "REMOVE-TODOLIST" ,
    id : string
}

export type AddTodoListActionType = {
    type : "ADD-TODOLIST" ,
    title : string
}

export type ChangeTodoListTitleActionType = {
    type : "CHANGE-TODOLIST-TITLE" ,
    todolistId : string ,
    newTitle : string
}

export type ChangeTodoListFilterActionType = {
    type : "CHANGE-TODOLIST-FILTER" ,
    todoListId : string ,
    newFilter : FilterValuesType
}

type ActionsType = DeleteTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

export const todoListsReducer = (state :Array<todoListType> , action : ActionsType):Array<todoListType>=>{
    switch (action.type){
        case "REMOVE-TODOLIST": {
            // создаем новый массив без того туду листа id котрого мы передали
            let filteredTodoListsState = state.filter(todolist => todolist.id != action.id)

            return filteredTodoListsState
        }
        case "ADD-TODOLIST": {
            //новый тудулист
            let newTodolist: todoListType = {
                id: v1(),
                filter: 'all',
                title: action.title
            }

            let newState = [
                ...state ,
                newTodolist
            ]

            return newState

        }
        case 'CHANGE-TODOLIST-TITLE':{
            //назодим тудулист в котором будет изменен title
            const findetTodoList  = state.find(todolist => todolist.id === action.todolistId)

            //если нашелся меняем ему заголовок
            if (findetTodoList) {
                findetTodoList.title = action.newTitle
                return [...state]
            }
            break
        }
        case "CHANGE-TODOLIST-FILTER": {
            //функция которая будет менять фильтр

            // находим по айди тудулист который будем менять
            let findetTodoList = state.find(todoList => todoList.id === action.todoListId)
            //если тудулист нашелся то меняем фильтр и перерисовываем
            if (findetTodoList) {
                findetTodoList.filter  = action.newFilter
                return [...state]
            }
            break
        }
        default :
            throw new Error("я не знаю такой тип action")
    }

    return state
}


//AC - action creater будем создавать обьект action
export const DeleteTodoListAC = (todoListId : string): DeleteTodoListActionType => {
    // функция которая создает action для todoListDelete
    return {
        type: "REMOVE-TODOLIST",
        id: todoListId
    }

}

export const AddTodoListAC = (todoListTitle : string): AddTodoListActionType =>{
    // функция которая создает action для todoListDelete
    return {
        type : "ADD-TODOLIST",
        title : todoListTitle
    }
}

export const ChangeTodoListTitleAC = (newTodoListTitle : string , todoListId : string): ChangeTodoListTitleActionType=>{
    // функция которая создает action для todoListDelete
    return {
        type : "CHANGE-TODOLIST-TITLE",
        todolistId : todoListId ,
        newTitle : newTodoListTitle
    }
}

export const ChangeTodoListFilterAC = ( todoListId : string , newTodoListFilter : FilterValuesType ): ChangeTodoListFilterActionType =>{
    // функция которая создает action для todoListDelete
    return {
        type : "CHANGE-TODOLIST-FILTER",
        todoListId : todoListId ,
        newFilter: newTodoListFilter
    }
}


