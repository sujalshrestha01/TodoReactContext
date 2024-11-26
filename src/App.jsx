import { useEffect, useState } from "react";

import "./App.css";
import Task from "./components/Task";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./context/TodoContext";

function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((each) => (each.id === id ? todo : each)));
  };
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((each) => each.id !== id));
  };
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((each) =>
        each.id === id ? { ...each, completed: !each.completed } : each
      )
    );
  };
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="w-full min-h-screen bg-slate-400">
        <div className="flex justify-center m-auto pt-16">
          <Task />
        </div>
        <div className="flex flex-wrap gap-y-3">
          {/*Loop and Add TodoItem here */}
          {todos.map((todo) => (
            <div key={todo.id} className="w-full">
              <TodoList todo={todo} />
            </div>
          ))}
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
