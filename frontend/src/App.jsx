import { useEffect, useState } from "react";
import api from "./api";
import "./style.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title) return;
    await api.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await api.put(`/tasks/${task._id}`, {
      completed: !task.completed,
    });
    fetchTasks();
  };

  return (
    <div className="container">
      <h1>Cloud To-Do List</h1>

      <div className="input-group">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span
              onClick={() => toggleTask(task)}
              className={task.completed ? "completed" : ""}
            >
              {task.title}
            </span>

            <button onClick={() => deleteTask(task._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;