import React from "react";

export function Todolist() {
    return (
        <div>
            <h3>What to learn ?</h3>
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