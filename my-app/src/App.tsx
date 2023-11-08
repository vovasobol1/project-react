import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {
    let initTasks: Array<TaskType> = [
        {id: 1, title: 'css', isDone: true},
        {id: 2, title: 'js', isDone: true},
        {id: 3, title: 'react', isDone: false}
    ]

    let arr = useState(initTasks) ;
    let tasks = arr[0]
    let setTasks = arr[1]

    function deleteTask(id: number) {
        let filteredTasks = tasks.filter(task => id !== task.id)// если это не то дело которое нужно удалить то вернется true и оно не удалится
        setTasks(filteredTasks)

        console.log(tasks)
    }


    return (
        <div className="App">
            <Todolist
                title="what to learn" //передаем заголовок туду листа
                tasks={tasks}         //передаем массив дел
                deleteTask={deleteTask} //передаем функцию удаления одного дела
            />
        </div>
    );
}

export default App;
