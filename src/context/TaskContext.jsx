import React, { createContext, useContext, useReducer, useEffect } from "react";
import { getLocalTasks, setLocalTasks } from "../utils/localstorage";
import { taskReducer } from "../models/taskReducer";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, getLocalTasks());

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);