import React, {ChangeEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (taskTitle: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
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
            props.addItem(newTaskTitle)
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

        props.addItem(newTaskTitle.trim())
        setNewTaskTitle('') //очищаем инпут
    }

    return (

        <div>
            <input value={newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""} //если в error не пустая строка то присвоится класс ошибка
            />
            <button onClick={addTask}>+</button>
            {error && <div className={'error-massage'}>{error}</div>}
        </div>

    )
}