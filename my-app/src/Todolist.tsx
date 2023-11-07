import React from "react";

type PropsType = {
    title : string
}

export function Todolist(props : PropsType ) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={true}/><span>css html</span></li>
                <li><input type="checkbox" checked={true}/><span>typescript</span></li>
                <li><input type="checkbox" checked={false}/><span>react</span></li>
            </ul>
            <div>
                <button>all</button>
                <button>active</button>
                <button>completed</button>
            </div>
        </div>
    )
}