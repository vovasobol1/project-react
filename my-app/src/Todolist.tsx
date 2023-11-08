import React, {ChangeEvent, KeyboardEventHandler, useState} from "react";
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
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        //фунцкия которая вызывается при нажатии изменениии инпута
        console.log('изменение в инпуте')
        setNewTaskTitle(event.currentTarget.value)
    }
    //тут не должен стоять тип any (надо потом исправить)
    const onKeyPressHandler = (event: any) => {
        if (event.code === 'Enter') {
            props.addTask(newTaskTitle)
            setNewTaskTitle('') //очищаем инпут
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('') //очищаем инпут
    }
    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedHandler = () => {
        props.changeFilter('completed')
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+
                </button>
            </div>
            <ul>
                {
                    // в пропсах приходит массив обьектов props.tasks (в нем лежат все дела ) с помощью map
                    // отрисовываем каждый жлемент этого массива
                    props.tasks.map((task) => {
                        const onDeleteHandler = () => {
                            props.deleteTask(task.id)
                        }

                        return <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={onDeleteHandler}>X</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>all</button>
                <button onClick={onActiveClickHandler}>active</button>
                <button onClick={onCompletedHandler}>completed</button>
            </div>
        </div>
    )
}