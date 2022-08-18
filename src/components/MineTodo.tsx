import React, { useState } from "react";
import { toast } from "react-toastify";
import { ITodo } from "../hooks/useData";
import { TodoItem } from "./TodoItem";
import { TodoList } from "./TodoList";

export type TTab = "MINE" | "CHILD";

interface Props {
  todos: ITodo[];
}

export function MineTodo({ todos }: Props) {
  return (
    <div className="mine-todo-container">
      <div className="todo-list">
        {todos.length > 0 &&
          todos.map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                type={"MINE"}
                onClick={(todo: ITodo) => {
                  console.log(todo);
                }}
              />
            );
          })}
      </div>
    </div>
  );
}
