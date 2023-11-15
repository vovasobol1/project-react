import {FilterValuesType, TasksStateType, todoListType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {AddTodoListActionType} from "./todolist-reducer";


export type DeleteTaskActionType = {
    type : "DELETE-TASK" ,
    todoListId : string ,
    taskId : string
}

export type AddTaskActionType = {
    type : "ADD-TASK" ,
    taskTitle : string ,
    todoListId : string
}

export type changeCheckBoxStatusActionType = {
    type : "CHANGE-CHECKBOX-STATUS" ,
    taskId : string
    todoListId : string
    isDone : boolean
}

export type changeTaskTitleActionType = {
    type : "CHANGE-TASK-TITLE"
    taskId : string
    todoListId : string
    newTitle : string
}


type ActionsType = DeleteTaskActionType | AddTaskActionType | changeCheckBoxStatusActionType | changeTaskTitleActionType | AddTodoListActionType

export const tasksReducer = (state : TasksStateType , action : ActionsType):TasksStateType => {
    switch (action.type){
        case "DELETE-TASK": {
            let stateCopy = {...state}
            let tasks = state[action.todoListId]  //находи массив тасок по айди который передали в функцию

            if (tasks) {
                let filteredTasks = tasks.filter(task => task.id !== action.taskId)//новый массив тасок который уже отфильтрован
                stateCopy[action.todoListId] = filteredTasks
            }
            return stateCopy
        }
        case "ADD-TASK": {
            let stateCopy = {...state}

            //создаем отдельно новую таску
            let newTask: TaskType = {
                id: v1(),
                title: action.taskTitle,
                isDone: false
            }

            let tasks = stateCopy[action.todoListId]
            let newTasks = [newTask , ...tasks]  //формируем новые таски в начало добавлем новые таски

            stateCopy[action.todoListId] = newTasks //теперь на том месте лежат новые таски
            return stateCopy
        }
        case "CHANGE-CHECKBOX-STATUS" : {
            let stateCopy = {...state}
            debugger
            let tasks = stateCopy[action.todoListId]

            let foundTask = tasks.find(task => task.id === action.taskId)

            //если таска нашлась
            if (foundTask) {
                foundTask.isDone = action.isDone
            }
            return stateCopy
        }
        case "CHANGE-TASK-TITLE" : {
            let copyState : TasksStateType = {...state}
            let tasks = copyState[action.todoListId]
            let foundTask = tasks.find(task => task.id === action.taskId)

            if (foundTask) {
                foundTask.title = action.newTitle
            }
            return copyState
        }
        case "ADD-TODOLIST" : {
            let copyState = {...state}
            copyState[v1()] = []

            return copyState
        }
        default :
            throw new Error("я не знаю такой тип action")
    }

    return state
}


//AC - action creater будем создавать обьект action
export const deleteTaskAC = (todoListId : string , taskId : string): DeleteTaskActionType => {
    return {
        type: "DELETE-TASK",
        todoListId : todoListId ,
        taskId : taskId
    }
}
export const addTaskAC = (taskTitle : string , todoListId : string):AddTaskActionType => {
    return {
        type : 'ADD-TASK' ,
        taskTitle ,
        todoListId
    }
}
export const changeCheckBoxStatusAC = (taskId : string , isDone : boolean , todoListId : string): changeCheckBoxStatusActionType => {
    return {
        type : "CHANGE-CHECKBOX-STATUS" ,
        isDone ,
        taskId ,
        todoListId
    }
}
export const changeTaskTitleAC = (taskId : string , newTitle : string , todoListId : string):changeTaskTitleActionType  => {
    return {
        type : "CHANGE-TASK-TITLE" ,
        newTitle ,
        taskId ,
        todoListId
    }
}
export const addTodoListAC = (taskTitle : string) =>{
    return{
        type : "ADD-TODOLIST",
        taskTitle : taskTitle
    }
}


