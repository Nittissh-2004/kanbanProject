import React from "react";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

export default function Column({ status, tasks }) {
  const { setNodeRef } = useDroppable({ id: status });

  const priorityRank = { High: 1, Medium: 2, Low: 3 };

  const sortedTasks = [...tasks].sort((a, b) => {
    const prioA = priorityRank[a.priority] || 4;
    const prioB = priorityRank[b.priority] || 4;

    if (prioA !== prioB) {
      return prioA - prioB;
    }

    const dateA = a.deadline ? new Date(a.deadline) : null;
    const dateB = b.deadline ? new Date(b.deadline) : null;

    if (!dateA) return 1;
    if (!dateB) return -1;
    return dateA - dateB;
  });

  const getTitleColor = () => {
    switch (status) {
      case "To Do":
        return "bg-red-500";
      case "In Progress":
        return "bg-blue-500";
      case "Done":
        return "bg-green-500";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="flex-1 min-w-[300px]  ">
      <h2
        style={{ fontFamily: "Poppins,sans-serif" }}
        className={`text-lg font-bold text-white mb-2 text-center py-2 rounded-t ${getTitleColor()}`}
      >
        {status}
      </h2>
      <div className="flex flex-col bg-white rounded-b p-2 pt-2 pb-2 h-[75vh]">
        <div
          className=" flex-grow overflow-y-auto space-y-2 scrollbar-hide "
          ref={setNodeRef}
        >
          {sortedTasks.map((task) => (
            <TaskCard key={task.id} task={task} status={status} />
          ))}
        </div>
      </div>
    </div>
  );
}