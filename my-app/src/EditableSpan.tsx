import React, {ChangeEvent, useState} from "react";
import {Checkbox, TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanType) {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        editMode === true ?
            <TextField value={title}
                       onBlur={activateViewMode}
                       onChange={onChangeTitleHandler}
                       variant="standard"
                       autoFocus={true}/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}