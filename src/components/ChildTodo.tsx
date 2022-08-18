import React, { useState } from "react";
import { toast } from "react-toastify";
import { ITodo } from "../hooks/useData";
import { TodoItem } from "./TodoItem";
import { TodoList } from "./TodoList";

export type TTab = "MINE" | "CHILD";

interface Props {
  todos: ITodo[];
  addTodo: (todo: ITodo) => void;
  doneTodo: (todo: ITodo) => void;
}

export function ChildTodo({ todos, addTodo, doneTodo }: Props) {
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const sendHandler = () => {
    if (price && content) {
      return addTodo({
        id: Date.now(),
        content: content,
        price: price,
        state: "TODO",
      });
    }
    toast("값을 입력하세요!");
  };
  return (
    <div className="child-todo-container">
      <div className="add-todo">
        <div className="input-container">
          <span>업무 </span>
          <div className="input-box">
            <input
              id="content"
              type="string"
              value={content}
              placeholder="content"
              onChange={(e) => {
                const enteredValue = e.target.value;
                setContent(enteredValue);
              }}
            />
          </div>
        </div>
        <div className="input-container">
          <span>보상 </span>
          <div className="input-box">
            <input
              id="price"
              type="string"
              value={price}
              placeholder="price"
              onChange={(e) => {
                const enteredValue = e.target.value;
                setPrice(enteredValue);
              }}
            />
          </div>
        </div>
        <button className="send-button" onClick={sendHandler}>
          <p>등록</p>
        </button>
      </div>
      <div className="todo-list">
        {todos.length > 0 &&
          todos.map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                type={"CHILD"}
                submit={doneTodo}
              />
            );
          })}
      </div>
    </div>
  );
}
