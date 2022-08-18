import React, { useState } from "react";
import { toast } from "react-toastify";
import { ITodo } from "../hooks/useData";
import { TTab } from "./Tab";

interface Props {
  todo: ITodo;
  type: TTab;
  onClick: (todo: ITodo) => void;
}

export function TodoItem({ todo, type, onClick }: Props) {
  return (
    <div className="todo-item-box" key={todo.id} onClick={() => onClick(todo)}>
      <div>
        <p>📌 {todo.content}</p>
        <p>💰 {todo.price}</p>
      </div>
      <div className="todo-state">
        {type === "MINE" && todo.state === "TODO" && (
          <p className="in-progress"></p>
        )}
        {type === "MINE" && todo.state === "FINISH" && <p>완료!</p>}
        {type === "MINE" && todo.state === "DONE" && <p>보상 받았어요😊</p>}
        {type === "CHILD" && todo.state === "TODO" && <p>진행중</p>}
        {type === "CHILD" && todo.state === "FINISH" && <p>확인하세요!</p>}
        {type === "CHILD" && todo.state === "DONE" && <p>보상 완료 😊</p>}
      </div>
    </div>
  );
}
