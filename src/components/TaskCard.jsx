import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import TaskModal from "./TaskModal";

export default function TaskCard({ status, task }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({
      id: task.id,
    });
  const [showModal, setShowModal] = useState(false);

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition,
    zIndex: transform ? 1000 : "auto",
    position: transform ? "absolute" : "relative",
    width: "auto",
    height: "auto",
    minWidth: "350px",
  };

  const getCardColor = () => {
    switch (status) {
      case "To Do":
        return "bg-red-200";
      case "In Progress":
        return "bg-blue-200";
      case "Done":
        return "bg-green-200";
      default:
        return "bg-white";
    }
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`text-black p-2 rounded shadow relative  ${getCardColor()}`}
      >
        {/* Drag Handle  */}
        <div
          {...listeners}
          {...attributes}
          className="absolute top-1 right-1 text-gray-500 cursor-grab "
          title="Drag task"
        >
          ⠿
        </div>

        {/* Modal trigger  */}
        <div
          onClick={() => setShowModal(true)}
          className="cursor-pointer space-y-1 hover:shadow-lg transition-all hover:scale-103  "
        >
          <div className="font-bold">{task.title}</div>
          <hr className="my-2 border-gray-400 w-auto" />
          <div className="text-sm break-words">{task.description}</div>

          {task.priority && (
            <span
              className={`inline-block text-xs font-semibold px-2 py-1 mt-2 rounded-full ${
                task.priority === "High"
                  ? "bg-orange-300 text-black"
                  : task.priority === "Medium"
                  ? "bg-yellow-200 text-black"
                  : "bg-green-200 text-black"
              }`}
            >
              {task.priority === "High"
                ? "🔥 High"
                : task.priority === "Medium"
                ? "⚡ Medium"
                : "💤 Low"}
            </span>
          )}
          <hr className="my-2 border-gray-400 w-auto" />
          {task.deadline &&
            (() => {
              const today = new Date();
              const dueDate = new Date(task.deadline);
              const timeDiff = dueDate - today;
              const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

              let label = `Deadline: ${task.deadline}`;
              let extra = "";

              if (dayDiff > 0) {
                extra = ` (${dayDiff} day${dayDiff > 1 ? "s" : ""} left)`;
              } else if (dayDiff === 0) {
                extra = ` (Due today!)`;
              } else {
                extra = ` (Overdue by ${Math.abs(dayDiff)} day${
                  Math.abs(dayDiff) > 1 ? "s" : ""
                })`;
              }

              return (
                <p
                  className={`text-xs mt-1 font-bold ${
                    dayDiff < 0
                      ? "text-red-700 font-semibold"
                      : "text-gray-900 font-semibold"
                  }`}
                >
                  {label}
                  {extra}
                </p>
              );
            })()}
        </div>
      </div>

      {showModal && (
        <TaskModal task={task} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}