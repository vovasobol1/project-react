import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'completed' |'active'  //тип значений для фильтрации чтобы в качестве фильтра не была любая строка

    function App() {
    let [tasks ,setTasks ] = useState<Array<TaskType>>( [
        {id: 1, title: 'css', isDone: true},
        {id: 2, title: 'js', isDone: true},
        {id: 3, title: 'react', isDone: false}
    ])
    let [filter ,setFilter ] = useState<FilterValuesType>("all")

    function changeFilter(value : FilterValuesType){
        //функция которая будет менять фильтр
        setFilter(value)
    }
    function deleteTask(id: number) {
        let filteredTasks = tasks.filter(task => id !== task.id)// если это не то дело которое нужно удалить то вернется true и оно не удалится
        setTasks(filteredTasks)
    }

    let TasksForTodolist = tasks
    if (filter === 'completed'){
        TasksForTodolist = tasks.filter(task => task.isDone === true)
    }

    if (filter === 'active'){
        TasksForTodolist = tasks.filter(task => task.isDone === false)
    }

    return (
        <div className="App">
            <Todolist
                title="what to learn" //передаем заголовок туду листа
                tasks={TasksForTodolist}         //передаем массив дел
                deleteTask={deleteTask} //передаем функцию удаления одного дела
                changeFilter={changeFilter} //передаем функцию которая менеят фильтры
            />
        </div>
    );
}

export default App;
