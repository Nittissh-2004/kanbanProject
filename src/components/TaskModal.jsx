import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";

export default function TaskModal({ task, onClose }) {
  const { dispatch } = useTasks();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [deadline, setDeadline] = useState(task.deadline);
  const [priority, setPriority] = useState(task.priority);

  const handleEdit = () => {
    dispatch({
      type: "EDIT_TASK",
      payload: { ...task, title, description, deadline, priority },
    });
    onClose();
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_TASK", payload: task.id });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-4 w-80 shadow-lg text-black">
        <h2 className="text-xl font-extrabold mb-4 text-center">Edit Task</h2>
        <div className="space-y-2">
          <input
            className="w-full p-2 border rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full p-2 border rounded h-[30vh]"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded"
            type="date"
            placeholder="Deadline (mm/dd/yyyy)"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          <select
            className="w-full p-2 border rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleEdit}
            className="bg-green-600 text-white px-4 py-1 rounded"
          >
            Save
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-1 rounded"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-yellow-500 text-black px-4 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}