import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const USERS_KEY = "USERS";
const TODOSLIST_KEY = "TODOSLIST";
export type TTodoState = "TODO" | "IN_PROGRESS" | "FINISH" | "DONE";

export interface ITodo {
  id: string;
  title: string;
  content: string;
  price: string;
  state: TTodoState;
}

export interface IUserInfo {
  name: string;
  picture: string;
  email: string;
  parent?: string;
  child?: string;
}

export interface ITodos {
  childId: string;
  parentId: string;
  todos: ITodo[];
}
export function useData() {
  const [user, setUser] = useState<IUserInfo>();
  const [userList, setUserList] = useState<IUserInfo[]>([]);
  const [todosList, setTodosList] = useState<ITodos[]>([]);

  function signIn(newUser: IUserInfo) {
    let currentUser;
    const isMember = userList.find((user) => user.email === newUser.email);
    if (isMember === undefined) {
      setUserList((userList) => [...userList, newUser]);
      currentUser = newUser;
      updateData([...userList, newUser]);
      toast(`welcome to be our new member, ${newUser.name}!`)!;
    } else {
      currentUser = isMember;
      toast(`hello! ${newUser.name}`)!;
    }

    setUser(currentUser);
  }
  function loadData() {
    const getUserList = localStorage.getItem(USERS_KEY);
    if (getUserList) {
      const parse: IUserInfo[] = JSON.parse(getUserList);
      setUserList(parse);
    }
    const getTodosList = localStorage.getItem(TODOSLIST_KEY);
    if (getTodosList) {
      const parse: ITodos[] = JSON.parse(getTodosList);
      setTodosList(parse);
    }
  }

  function addParent(updatedUserInfo: IUserInfo) {
    setUser(updatedUserInfo);
    const updatedUserInfoList = userList.map((user) => {
      if (user.email === updatedUserInfo.email) {
        return updatedUserInfo;
      }
      if (user.email === updatedUserInfo.parent) {
        return { ...user, child: updatedUserInfo.email };
      }
      return user;
    });
    updateData(updatedUserInfoList);
  }

  function updateData(users?: IUserInfo[], todoss?: ITodos[]) {
    if (users) {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
    if (todoss) {
      localStorage.setItem(TODOSLIST_KEY, JSON.stringify(todoss));
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return {
    user,
    addParent,
    signIn,
    loadData,
    userList,
    todosList,
    updateData,
  };
}
