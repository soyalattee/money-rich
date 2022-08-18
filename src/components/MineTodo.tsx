import React, { useState } from "react";
import { toast } from "react-toastify";
import { ITodo } from "../hooks/useData";
import { TodoItem } from "./TodoItem";
import { TodoList } from "./TodoList";

export type TTab = "MINE" | "CHILD";

interface Props {
  todos: ITodo[];
  finishTodo: (todo: ITodo) => void;
}

export function MineTodo({ todos, finishTodo }: Props) {
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
                submit={finishTodo}
              />
            );
          })}
      </div>
    </div>
  );
}
