import React, { useRef, useState } from "react";
import { useTodo } from "../context/TodoContext";

function TodoList({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoTask, setTodoTask] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();
  const inputTodo = useRef();
  // console.log(isTodoEditable);
  const editTodo = (e) => {
    updateTodo(todo.id, { ...todo, todo: todoTask });
    setIsTodoEditable(false);
  };
  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  // console.log(todo)

  return (
    <div
      className={`w-96 h-7 rounded-md mt-5 bg-[#256EFF] flex gap-3 px-2 border-[#0000005e] border-[1px] m-auto ${
        todo.completed ? "bg-green-500" : "bg-[#256EFF]"
      } `}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        ref={inputTodo}
        className={`border-none outline-none w-full  ${
          todo.completed ? "bg-green-500 line-through" : "bg-[#256EFF]"
        }`}
        value={todoTask}
        type="text"
        readOnly={!isTodoEditable}
        onChange={(e) => setTodoTask(e.target.value)}
        name=""
        id=""
      />
      <button
        className="font-bold hover:opacity-65 "
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            editTodo();
          } else {
            inputTodo.current.focus();
            setIsTodoEditable((prev) => !prev);
          }
        }}
        disabled={todo.completed}
        hidden={todo.completed}
      >
        {isTodoEditable ? "Save" : "Edit"}
      </button>
      <button
        className=" font-bold hover:opacity-65"
        onClick={() => deleteTodo(todo.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default TodoList;
