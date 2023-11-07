import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {
    return (
        <div className="App">
            <Todolist title="what to learn" />
            <Todolist title="movies" />
            <Todolist title="games" />
        </div>
    );
}

export default App;
