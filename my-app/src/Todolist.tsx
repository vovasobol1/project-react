import React from "react";
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;
import {FilterValuesType} from "./App";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType> //мы ждем на вход массив состоящий из обьектов TaskType
    deleteTask : (id : number) => void
    changeFilter: (value: FilterValuesType) => void
}

export function Todolist(props: PropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    // в пропсах приходит массив обьектов props.tasks (в нем лежат все дела ) с помощью map
                    // отрисовываем каждый жлемент этого массива
                    props.tasks.map((task) => {
                        return <li>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={ () => { props.deleteTask(task.id)} }>X</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={()=>{props.changeFilter('all')}} >all</button>
                <button onClick={()=>{props.changeFilter('active')}} >active</button>
                <button onClick={()=>{props.changeFilter('completed')}} >completed</button>
            </div>
        </div>
    )
}