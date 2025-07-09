import React from "react";
import KanbanBoard from "./views/KanbanBoard";
import { TaskProvider } from "./context/TaskContext";

export default function App() {
  return (
    <TaskProvider>
      <KanbanBoard />
    </TaskProvider>
  );
}