import React from "react";
import Column from "../components/Column";
import TaskForm from "../components/TaskForm";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { useTasks } from "../context/TaskContext";

const columns = ["To Do", "In Progress", "Done"];

export default function KanbanBoard() {
  const { tasks, dispatch } = useTasks();

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const movedTask = tasks.find((task) => task.id === active.id);
    if (movedTask && movedTask.status !== over.id) {
      dispatch({
        type: "MOVE_TASK",
        payload: { id: movedTask.id, status: over.id },
      });
    }
  };

  return (
    <div className="p-4 bg-neutral-700 min-h-screen text-white">
      <h1
        style={{ fontFamily: "Poppins,sans-serif" }}
        className="text-3xl font-bold text-center mb-6"
      >
        Kanban Board{" "}
      </h1>
      <div className="flex flex-wrap gap-4 justify-center">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          {columns.map((col) => (
            <Column
              key={col}
              status={col}
              tasks={tasks.filter((task) => task.status === col)}
            />
          ))}
        </DndContext>

        <div className="w-full sm:w-[300px] ">
          <div className="bg-white rounded-t  ">
            <h3
              style={{ fontFamily: "Poppins,sans-serif" }}
              className="bg-yellow-500 text-white text-center py-2 px-4  font-bold rounded-t text-lg "
            >
              Add To Do
            </h3>
          </div>
          <div className="  px-2 bg-white rounded-b mt-2">
            <TaskForm status="To Do" />
          </div>
        </div>
      </div>
    </div>
  );
}