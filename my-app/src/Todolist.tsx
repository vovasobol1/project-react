import React, {ChangeEvent, ChangeEventHandler, KeyboardEventHandler, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;
import {FilterValuesType} from "./App";
import error = Simulate.error;


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
    changeCheckBoxStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        //убираем сообщение об ошибке
        setError(null)
        //фунцкия которая вызывается при нажатии изменениии инпута
        setNewTaskTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: any) => {
        //тут не должен стоять тип any (надо потом исправить)
        if (event.code === 'Enter') {
            props.addTask(newTaskTitle)
            setNewTaskTitle('') //очищаем инпут
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() === '') {
            //если мы пытаемся добавить дело которое состоит из пустой строки то будет выход из фкнцкии
            //.trim() обрежет все пробелы потому если этого не сделать пользователь может напечатать много пробелов
            // и выхода из функции не будет
            setError("это поле обязательно")
            return
        }
        props.addTask(newTaskTitle.trim())
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
                       className={error ? "error" : ""} //если в error не пустая строка то присвоится класс ошибка
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-massage'}>{error}</div>}
            </div>
            <ul>
                {
                    // в пропсах приходит массив обьектов props.tasks (в нем лежат все дела ) с помощью map
                    // отрисовываем каждый жлемент этого массива
                    props.tasks.map((task) => {
                        const onDeleteHandler = () => {
                            props.deleteTask(task.id)
                        }//функция которая удаляет дело
                        const onChangeCheckBoxHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeCheckBoxStatus(task.id, event.target.checked)
                        }//функция которая менеят статус чекбокса

                        return (
                            <li key={task.id} className={task.isDone === true ? "task-Is-Done" : ""}>
                                <input type="checkbox" onChange={onChangeCheckBoxHandler} checked={task.isDone}/>
                                <span>{task.title}</span>
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