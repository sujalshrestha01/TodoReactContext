import { useState } from "react";
import React from "react";
import { useTodo } from "../context/TodoContext";

function Task() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();
  const add = (e) => {
    e.preventDefault();
    if (!todo) return;

    addTodo({ todo: todo.trim(), completed: false });
    setTodo("");
  };
  return (
    <form onSubmit={add}>
      <input
        type="text"
        placeholder="Enter your task..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="w-96 h-8 pl-3 outline-none"
      />

      <input type="submit" value="Add" className="bg-green-500 h-8 w-14" />
    </form>
  );
}

export default Task;
