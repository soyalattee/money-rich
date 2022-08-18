import React, { useState } from "react";
import { Info } from "./components/Info";
import { Tab, TTab } from "./components/Tab";
import { TodoList } from "./components/TodoList";
import logo from "./logo.svg";
import "./styles/App.scss";

export type TTodoState = "TODO" | "IN_PROGRESS" | "FINISH" | "DONE";
export interface ITodo {
  id: string;
  title: string;
  content: string;
  price: string;
  state: TTodoState;
}
function App() {
  const [loading, setLoading] = useState(false);
  const [tabState, setTabState] = useState<TTab>("MINE");
  const [myTodos, setMyTodos] = useState<ITodo[]>([]);
  const [childTodos, setChildTodos] = useState<ITodo[]>([]);
  return (
    <div className="App">
      <Info name="소연" />
      <Tab switchTab={setTabState} tabState={tabState} />
      {tabState === "MINE" && <TodoList todos={myTodos} />}
      {tabState === "CHILD" && <TodoList todos={childTodos} />}
    </div>
  );
}

export default App;
