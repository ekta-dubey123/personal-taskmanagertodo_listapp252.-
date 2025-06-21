    import React from 'react';
    import { TodoItem } from "./TodoItem";

    export const Todos = ({ todos, onDelete, toggleDone }) => {
    let myStyle = {
        minHeight: "70vh",
        margin: "40px auto",
        maxWidth: "600px",
    };

    return (
        <div className="container" style={myStyle}>
        <h3 className="my-3 text-center">My Tasks</h3>
      {todos.length === 0 ? (
        "No Tasks to display"
      ) : (
        todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.sno}
            onDelete={onDelete}
            toggleDone={toggleDone}
          />
        ))
      )}
    </div>
  );
};
