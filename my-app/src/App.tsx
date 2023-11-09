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

    function addTask(title: string , todoListId : string) {
        //функция добавления нового дела
        let newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }

        let newTasks: Array<TaskType> = [newTask, ...tasks[todoListId]] //новый массив всез дел с новым делом

        tasks[todoListId] = newTasks
        setTasks({...tasks}) //отрисовываем новый обьект
    }

    function deleteTask(id: string , todoListId : string ) {

        let filteredTasks = tasks[todoListId].filter(task => id !== task.id)// если это не то дело которое нужно удалить то вернется true и оно не удалится
        tasks[todoListId] = filteredTasks
        setTasks({...tasks})//отдаем копию обьекта иначе реакт ничего не перерисовывает
    }

    const changeCheckBoxStatus = (taskId: string, isDone: boolean , todoListId : string) => {
        //функция которая меняет статус чекбокса
        let foundTask = tasks[todoListId].find(task => task.id === taskId) //находим таску и записываем найденную таску в переменную foundTask
        //если нашлось дело с таким id и там не лежит undefined тогда менеям на противоположное
        if (foundTask !== undefined) {
            foundTask.isDone = isDone //менеям на значение которое пришло в параметр функции
            tasks[taskId] = []
            setTasks({...tasks}) //отрисовываем новый массив
        }

    }

    let todoListId1 = v1()
    let todoListId2 = v1()

    const [todoLists, setTodoLists] = useState<Array<todoListType>>([
        {id: todoListId1, title: "what to learn", filter: 'active'},
        {id: todoListId2, title: "films", filter: 'all'},
    ])

    const [tasks, setTasks] = useState({
        [todoListId1]:[
            {id:v1() , title:'js' , isDone:true} ,
            {id:v1() , title:'html' , isDone:true} ,
            {id:v1() , title:'vscode' , isDone:true} ,
            {id:v1() , title:'react' , isDone:false}
        ] ,
        [todoListId2]:[
            {id:v1() , title:'астрал' , isDone:true} ,
            {id:v1() , title:'оно' , isDone:true} ,
            {id:v1() , title:'терминатор' , isDone:false}
        ]

    })
    return (
        <div className="App">
            {

                todoLists.map(todoList => {
                    //тут происходит фильтрация
                    let TasksForTodolist = tasks[todoList.id]

                    if (todoList.filter === 'completed') {
                        TasksForTodolist = TasksForTodolist.filter(task => task.isDone === true)
                    }
                    if (todoList.filter === 'active') {
                        TasksForTodolist = TasksForTodolist.filter(task => task.isDone === false)
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
