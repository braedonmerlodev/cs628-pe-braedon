import React from 'react';

function Todo({ index, task, deleteTodo }) {
    return (
        <li>
            {task}
            <button onClick={() => deleteTodo(index)}>Delete</button>
        </li>
    );
}

export default Todo; 