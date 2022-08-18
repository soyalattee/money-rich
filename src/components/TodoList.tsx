import React, { useState } from "react";
import { toast } from "react-toastify";
import { ITodo } from "../hooks/useData";

export type TTab = "MINE" | "CHILD";

interface Props {
  todos: ITodo[];
}

export function TodoList({ todos }: Props) {
  return <div className="todos"></div>;
}
