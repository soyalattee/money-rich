import React, { useState } from "react";
import { toast } from "react-toastify";
import { ITodo } from "../hooks/useData";
import { TTab } from "./Tab";

interface Props {
  todo: ITodo;
  type: TTab;
  submit: (todo: ITodo) => void;
}

export function TodoItem({ todo, type, submit }: Props) {
  return (
    <div className="todo-item-box" key={todo.id} onClick={() => submit(todo)}>
      <div>
        <p>π {todo.content}</p>
        <p>π° {todo.price}</p>
      </div>
      <div className="todo-state">
        {type === "MINE" && todo.state === "TODO" && (
          <p className="in-progress"></p>
        )}
        {type === "MINE" && todo.state === "FINISH" && <p>μλ£!</p>}
        {type === "MINE" && todo.state === "DONE" && <p>λ³΄μ λ°μμ΄μπ</p>}
        {type === "CHILD" && todo.state === "TODO" && <p>μ§νμ€</p>}
        {type === "CHILD" && todo.state === "FINISH" && <p>νμΈνμΈμ!</p>}
        {type === "CHILD" && todo.state === "DONE" && <p>λ³΄μ μλ£ π</p>}
      </div>
    </div>
  );
}
