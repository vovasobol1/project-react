import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType> //мы ждем на вход массив состоящий из обьектов TaskType
    deleteTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (taskTitle: string, todoListId: string) => void
    changeCheckBoxStatus: (id: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    deleteTodoList: (id: string) => void
    changeTaskTitle: (taskId :string, newTitle :string , todoListId : string)=>void
    changeTodoListTitle:(newTitle : string , todoListId : string)=>void
}

export function Todolist(props: PropsType) {
    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedHandler = () => {
        props.changeFilter('completed', props.id)
    }
    const deleteTodoListHandler = () => {
        props.deleteTodoList(props.id)
    }
    const addTask = (title : string) =>{
        props.addTask(title , props.id)
    }
    const changeTodoListTitle = (newTitle : string)=>{
        props.changeTodoListTitle(props.id , newTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <button onClick={deleteTodoListHandler}>X</button>
            </h3>
            <AddItemForm addItem={addTask}  />
            <ul>
                {
                    // в пропсах приходит массив обьектов props.tasks (в нем лежат все дела ) с помощью map
                    // отрисовываем каждый жлемент этого массива
                    props.tasks.map((task) => {
                        const onDeleteHandler = () => {
                            props.deleteTask(task.id, props.id)
                        }//функция которая удаляет дело
                        const onChangeCheckBoxHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeCheckBoxStatus(task.id, event.target.checked, props.id)
                        }//функция которая менеят статус чекбокса
                        const onChangeSpanValueHandler = (newValue : string)=>{
                            props.changeTaskTitle(task.id , newValue , props.id)
                        }

                        return (
                            <li key={task.id} className={task.isDone === true ? "task-Is-Done" : ""}>
                                <input type="checkbox" onChange={onChangeCheckBoxHandler} checked={task.isDone}/>
                                <EditableSpan title={task.title} onChange={onChangeSpanValueHandler}/>
                                <button onClick={onDeleteHandler}>X</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-fiter" : ""}
                        onClick={onAllClickHandler}>all
                </button>
                <button className={props.filter === "active" ? "active-fiter" : ""}
                        onClick={onActiveClickHandler}>active
                </button>
                <button className={props.filter === "completed" ? "active-fiter" : ""}
                        onClick={onCompletedHandler}>completed
                </button>
            </div>
        </div>
    )
}

