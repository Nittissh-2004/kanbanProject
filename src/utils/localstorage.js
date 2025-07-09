export const getLocalTasks = () => {
  const data = localStorage.getItem("kanban-tasks");
  return data ? JSON.parse(data) : [];
};

export const setLocalTasks = (tasks) => {
  localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
};