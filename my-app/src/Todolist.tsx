import React, {useState} from "react";
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;
import {FilterValuesType} from "./App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType> //мы ждем на вход массив состоящий из обьектов TaskType
    deleteTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (taskTitle: string) => void
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={(event) => {
                           setNewTaskTitle(event.currentTarget.value)
                       }}
                       onKeyPress={(event)=>{
                            if (event.code === 'Enter') {
                                props.addTask(newTaskTitle)
                                setNewTaskTitle('') //очищаем инпут
                            }
                       }}
                />
                <button onClick={() => {
                    props.addTask(newTaskTitle)
                    setNewTaskTitle('') //очищаем инпут
                }}>+
                </button>
            </div>
            <ul>
                {
                    // в пропсах приходит массив обьектов props.tasks (в нем лежат все дела ) с помощью map
                    // отрисовываем каждый жлемент этого массива
                    props.tasks.map((task) => {
                        return <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={() => {
                                props.deleteTask(task.id)
                            }}>X
                            </button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter('all')
                }}>all
                </button>
                <button onClick={() => {
                    props.changeFilter('active')
                }}>active
                </button>
                <button onClick={() => {
                    props.changeFilter('completed')
                }}>completed
                </button>
            </div>
        </div>
    )
}