import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { v4 as uuidv4 } from "uuid";

export default function TaskForm() {
  const { dispatch } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !deadline) {
      alert("Please Fill In All Fields");
      return;
    }
    dispatch({
      type: "ADD_TASK",
      payload: {
        id: uuidv4(),
        title,
        description,
        deadline,
        priority,
        status: "To Do",
      },
    });
    setTitle("");
    setDescription("");
    setDeadline("");
    setPriority("Medium");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className=" rounded-t  w-70 p-1 h-[75vh] overflow-y-auto scorllbar-hide   "
      >
        <div className="text-black ">
          <input
            className="w-full  block border rounded-md mt-1 px-3 py-2 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            className="w-full  block border rounded-md mt-1 px-3 py-2 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500  h-[48vh]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <input
            className="w-full  block border rounded-md mt-1 px-3 py-2 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 "
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="mm/dd/yyyy"
          />
        </div>
        <select
          className="w-full  block border rounded-md mt-1 px-3 py-2 text-black border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 "
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium"> Medium</option>
          <option value="Low">Low</option>
        </select>
        <button
          className="bg-black text-white p-1 w-full mt-2 rounded font-bold hover:scale-95 transition "
          type="submit"
        >
          Add
        </button>
      </form>
    </>
  );
}