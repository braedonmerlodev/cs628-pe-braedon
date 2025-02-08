import React, { useState } from 'react';
import Todo from './Todo';
import './App.css';

function App() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    // Method to add a new ToDo
    const addTodo = () => {
        if (input.trim() === '') return;
        setTodos([...todos, input]);
        setInput('');
    };

    // Method to delete a ToDo by index
    const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    return (
        <div className="App">
            <h1>ToDo List App</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter a task"
                />
                <button className="add-button" onClick={addTodo}>Add Task</button>
            </div>
            <ul>
                {todos.map((todo, index) => (
                    <Todo
                        key={index}
                        index={index}
                        task={todo}
                        deleteTodo={deleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
}

export default App;
