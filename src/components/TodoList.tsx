import React, { useState } from "react";
import { toast } from "react-toastify";
import { ITodo } from "../App";

export type TTab = "MINE" | "CHILD";

interface Props {
  todos: ITodo[];
}

export function TodoList({ todos }: Props) {
  return <div className="todos"></div>;
}
