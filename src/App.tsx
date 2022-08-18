import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { tokenToString } from "typescript";
import { GoogleOAuth } from "./components/GoogleOAuth";
import { Info } from "./components/Info";
import { Tab, TTab } from "./components/Tab";
import { TodoList } from "./components/TodoList";
import { ITodo, useData } from "./hooks/useData";
import "./styles/App.scss";
import { parseJwt } from "./utils";
import "react-toastify/dist/ReactToastify.css";
import { AddParent } from "./components/AddParent";

function App() {
  const [loading, setLoading] = useState(false);
  const [tabState, setTabState] = useState<TTab>("MINE");
  const [myTodos, setMyTodos] = useState<ITodo[]>([]);
  const [childTodos, setChildTodos] = useState<ITodo[]>([]);
  const [credential, setCredential] = useState<string>();
  const [parentEmail, setParentEmail] = useState<string | undefined>();
  const { signIn, loadData, userList, todosList, updateData, user, addParent } =
    useData();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredValue = e.target.value;
    setParentEmail(enteredValue);
  };
  const addParentHandler = () => {
    if (!user) {
      toast("로그인 하세요!");
      return;
    }
    if (parentEmail == "") {
      toast("부모 이메일을 입력하세요!");
      return;
    }
    if (parentEmail) {
      //부모계정이 등록된 계정인지 확인 후 그냥 바로 등록하자
      const isAvailableEmail = userList.find(
        (user) => user.email === parentEmail
      );
      if (!isAvailableEmail) {
        toast(`${parentEmail}는 없는 계정입니다.`);
        setParentEmail("");
        return;
      }
      if (isAvailableEmail.child) {
        toast(`${parentEmail}는 이미 자식이 있습니다!`);
        setParentEmail("");
        return;
      }
      addParent({ ...user, parent: isAvailableEmail.email });
      setParentEmail("");
    }
  };

  const getMyTodos = () => {
    if (todosList.length == 0) return;
    const todos = todosList.find((todo) => {
      return todo.childId === user?.email;
    });
    if (!todos) return;
    setMyTodos(todos.todos);
  };
  const getChildTodos = () => {
    if (todosList.length == 0) return;
    const todos = todosList.find((todo) => {
      return todo.parentId === user?.email;
    });
    if (!todos) return;
    setChildTodos(todos.todos);
  };

  useEffect(() => {
    if (!credential) return;

    const result = parseJwt(credential);
    signIn({
      name: result.name,
      picture: result.picture,
      email: result.email,
    });
  }, [credential]);

  useEffect(() => {
    if (!user) return;
    getMyTodos();
    getChildTodos();
  }, [user]);

  return (
    <div className="App">
      <ToastContainer />
      {!user && <GoogleOAuth setCredential={setCredential} />}
      {user && <Info name={user.name} imgUrl={user.picture} />}
      <Tab switchTab={setTabState} tabState={tabState} />
      {tabState === "MINE" && !user?.parent && (
        <AddParent
          onChange={onChange}
          submit={addParentHandler}
          inputValue={parentEmail}
        />
      )}
      {tabState === "CHILD" && !user?.child && (
        <div className="no-child">
          <p>자식이 없어용!</p>
        </div>
      )}
      {tabState === "MINE" && <TodoList todos={myTodos} />}
      {tabState === "CHILD" && <TodoList todos={childTodos} />}
    </div>
  );
}

export default App;
