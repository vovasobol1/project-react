import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {BottomNavigation, BottomNavigationAction, Button, ButtonGroup, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";


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
                <IconButton onClick={deleteTodoListHandler} >
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}  />
            <div>
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
                            <div key={task.id} className={task.isDone === true ? "task-Is-Done" : ""}>
                                <Checkbox onChange={onChangeCheckBoxHandler} checked={task.isDone}/>
                                <EditableSpan title={task.title} onChange={onChangeSpanValueHandler}/>
                                <IconButton onClick={onDeleteHandler} >
                                    <Delete />
                                </IconButton>
                            </div>
                        )
                    })
                }
            </div>
            <ButtonGroup>
                <Button variant={props.filter === "all" ? "contained" : "outlined"}
                        onClick={onAllClickHandler}>all
                </Button>
                <Button color={'success'} variant={props.filter === "active" ? "contained" : "outlined"}
                        onClick={onActiveClickHandler}>active
                </Button>
                <Button color={'secondary'} variant={props.filter === "completed" ? "contained" : "outlined"}
                        onClick={onCompletedHandler}>completed
                </Button>
            </ButtonGroup>
        </div>
    )
}

