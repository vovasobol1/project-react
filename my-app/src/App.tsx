import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'completed' | 'active'  //тип значений для фильтрации чтобы в качестве фильтра не была любая строка
type todoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    //локальный state в котором хранятся все дела в виде обьектов
    //когда вызывается фунцкия setTasks с новым массивом tasks state обновится и
    //компонента перересуется
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'css', isDone: true},
        {id: v1(), title: 'js', isDone: true},
        {id: v1(), title: 'react', isDone: false}
    ])

    function changeFilter(value: FilterValuesType, todoListId: string) {
        //функция которая будет менять фильтр

        // находим по айди тудулист который будем менять
        let findetTodoList = todoLists.find(todoList => todoList.id === todoListId)
        console.log(findetTodoList)
        //если тудулист нашелся то меняем фильтр и перерисовываем
        if (findetTodoList){
            findetTodoList.filter = value
            setTodoLists([...todoLists])
        }
    }


    function addTask(title: string) {
        //функция добавления нового дела
        let newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }

        let newTasks: Array<TaskType> = [newTask, ...tasks] //новый массив всез дел с новым делом
        setTasks(newTasks) //отрисовываем новый массив
    }

    function deleteTask(id: string) {
        let filteredTasks = tasks.filter(task => id !== task.id)// если это не то дело которое нужно удалить то вернется true и оно не удалится
        setTasks(filteredTasks)
    }

    const changeCheckBoxStatus = (taskId: string, isDone: boolean) => {
        //функция которая меняет статус чекбокса
        let foundTask = tasks.find(task => task.id === taskId) //находим таску и записываем найденную таску в переменную foundTask
        //если нашлось дело с таким id и там не лежит undefined тогда менеям на противоположное
        if (foundTask !== undefined) {
            foundTask.isDone = isDone //менеям на значение которое пришло в параметр функции

            let copyTasks = [...tasks] //создали точно такой же массив чтобы реакт понял что в массиве произошли ищзменения иначе он не отрисует
            console.log(tasks)
            setTasks(copyTasks) //отрисовываем новый массив
        }

    }

    const [todoLists, setTodoLists] = useState<Array<todoListType>>([
        {id: v1(), title: "what to learn", filter: 'active'},
        {id: v1(), title: "films", filter: 'all'},
    ])

    return (
        <div className="App">
            {

                todoLists.map(todoList => {
                    //тут происходит фильтрация
                    let TasksForTodolist = tasks
                    if (todoList.filter === 'completed') {
                        TasksForTodolist = tasks.filter(task => task.isDone === true)
                    }
                    if (todoList.filter === 'active') {
                        TasksForTodolist = tasks.filter(task => task.isDone === false)
                    }
                    return (
                        <Todolist
                            key={todoList.id}
                            id={todoList.id}
                            title={todoList.title} //передаем заголовок туду листа
                            tasks={TasksForTodolist}         //передаем массив дел
                            deleteTask={deleteTask} //передаем функцию удаления одного дела
                            changeFilter={changeFilter} //передаем функцию которая менеят фильтры
                            addTask={addTask} // передаем фунцкию которая добавляет новое дело
                            changeCheckBoxStatus={changeCheckBoxStatus} //передаем фунцкию которая которая меняет статус чекбокса
                            filter={todoList.filter}
                        />
                    )
                })

            }
        </div>
    );
}

export default App;
