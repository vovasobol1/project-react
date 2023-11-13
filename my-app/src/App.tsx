import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {Container, Grid, Paper} from "@mui/material";
import {AppBarComponent} from "./AppBarComponent";

export type FilterValuesType = 'all' | 'completed' | 'active'  //тип значений для фильтрации чтобы в качестве фильтра не была любая строка
type todoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    function changeFilter(value: FilterValuesType, todoListId: string) {
        //функция которая будет менять фильтр

        // находим по айди тудулист который будем менять
        let findetTodoList = todoLists.find(todoList => todoList.id === todoListId)
        //если тудулист нашелся то меняем фильтр и перерисовываем
        if (findetTodoList) {
            findetTodoList.filter = value
            setTodoLists([...todoLists])
        }
    }
    function addTask(title: string, todoListId: string) {
        let tasks = tasksObj[todoListId] // достаем все дела конкретного тудулиста (обратимся к нему поо айди)

        //функция добавления нового дела
        let newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }

        let newTasks: Array<TaskType> = [newTask, ...tasks] //новый массив всех дел с новым делом

        tasksObj[todoListId] = newTasks
        setTasks({...tasksObj}) //отрисовываем новый обьект
    }
    function deleteTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId] // достаем все дела конкретного тудулиста (обратимся к нему поо айди)

        let filteredTasks = tasks.filter(task => id !== task.id)// если это не то дело которое нужно удалить то вернется true и оно не удалится
        tasksObj[todoListId] = filteredTasks
        setTasks({...tasksObj})//отдаем копию обьекта иначе реакт ничего не перерисовывает
    }
    const changeCheckBoxStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        let tasks = tasksObj[todoListId] // достаем все дела конкретного тудулиста (обратимся к нему поо айди)

        //функция которая меняет статус чекбокса
        let foundTask = tasks.find(task => task.id === taskId) //находим таску и записываем найденную таску в переменную foundTask
        //если нашлось дело с таким id и там не лежит undefined тогда менеям на противоположное
        if (foundTask !== undefined) {
            foundTask.isDone = isDone //менеям на значение которое пришло в параметр функции
            setTasks({...tasksObj}) //отрисовываем новый массив
        }

    }
    const deleteTodoList = (todoListId: string) => {
        // создаем новый массив без того туду листа id котрого мы передали
        let filteredTodoLists = todoLists.filter(todolist => todolist.id != todoListId)
        setTodoLists(filteredTodoLists)//перерисовка

        delete tasksObj[todoListId] //удаляем все дела с таким id
        setTasks({...tasksObj})
    }
    const addTodoList = (title: string) => {
        //новый тудулист
        let newTodolist: todoListType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        //отправлем пустой массив в массив дел
        setTasks({
            ...tasksObj,
            [newTodolist.id]: []
        })

        setTodoLists([newTodolist, ...todoLists])
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        //достаем нужный массив который будем менять
        let tasks = tasksObj[todoListId]

        //найдем нужную таску по taskId
        let findetTask = tasks.find(task => task.id === taskId)
        //если таска нашлась меняем в ней тайтл
        if (findetTask) {
            findetTask.title = newTitle
            //сетаем стейт чтобы все отрисовалось снова
            setTasks({...tasksObj})
        }

    }
    const changeTodoListTitle = (todolistId: string, newTitle: string) => {
        //назодим тудулист в котором будет изменен title
        const findetTodoList = todoLists.find(todolist => todolist.id === todolistId)

        //если что то нашлось
        if (findetTodoList) {
            findetTodoList.title = newTitle
            setTodoLists([...todoLists])
        }


    }

    let todoListId1 = v1()
    let todoListId2 = v1()

    const [todoLists, setTodoLists] = useState<Array<todoListType>>([
        {id: todoListId1, title: "what to learn", filter: 'all'},
        {id: todoListId2, title: "продукты", filter: 'all'},
    ])
    const [tasksObj, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: 'js', isDone: true},
            {id: v1(), title: 'html', isDone: true},
            {id: v1(), title: 'vscode', isDone: false},
            {id: v1(), title: 'react', isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: 'молоко', isDone: true},
            {id: v1(), title: 'сыр', isDone: true},
            {id: v1(), title: 'хлеб', isDone: false}
        ]

    })

    return (
        <div className="">
            <AppBarComponent/>
            <Container fixed>
                <Grid container style={ {padding : "20px"} }>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(todoList => {
                            //тут происходит фильтрация
                            let TasksForTodolist = tasksObj[todoList.id]

                            if (todoList.filter === 'completed') {
                                TasksForTodolist = TasksForTodolist.filter(task => task.isDone === true)
                            }
                            if (todoList.filter === 'active') {
                                TasksForTodolist = TasksForTodolist.filter(task => task.isDone === false)
                            }
                            return (

                                <Grid item>
                                    <Paper elevation={3} style={ {padding : "10px"} }>
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
                                            deleteTodoList={deleteTodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}



export default App;
