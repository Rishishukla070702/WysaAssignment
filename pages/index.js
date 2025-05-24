import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:7100";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);

  const fetchTasks = async () => {
    const res = await axios.get(`${BASE_URL}/getAllTask`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addOrUpdateTask = async () => {
    if (!title.trim()) return;
    if (editId) {
      await axios.put(`${BASE_URL}/updateTask/${editId}`, {
        title,
        isComplete: false,
      });
      setEditId(null);
    } else {
      await axios.post(`${BASE_URL}/addTask`, { title });
    }
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${BASE_URL}/deleteTask/${id}`);
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await axios.put(`${BASE_URL}/updateTask/${task.id}`, {
      title: task.title,
      isComplete: !task.isComplete,
    });
    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.isComplete;
    if (filter === "pending") return !task.isComplete;
    return true;
  });

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Simple Task Manager</h1>

      <div className="flex mb-4 gap-2">
        <input
          type="text"
          className="border p-2 flex-1"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addOrUpdateTask}
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        {['all', 'completed', 'pending'].map((status) => (
          <button
            key={status}
            className={`px-3 py-1 rounded border ${
              filter === status ? "bg-blue-500 text-white" : "bg-white"
            }`}
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between border-b py-2"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.isComplete}
                onChange={() => toggleComplete(task)}
              />
              <span
                className={`cursor-pointer ${
                  task.isComplete ? "line-through text-gray-400" : ""
                }`}
                onClick={() => {
                  setTitle(task.title);
                  setEditId(task.id);
                }}
              >
                {task.title}
              </span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
