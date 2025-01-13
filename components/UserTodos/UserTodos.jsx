import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./UserTodos.module.css";

function UserTodos({ userId }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/todos/user/${userId}`)
      .then((response) => {
        setTodos(response.data.todos);
        toast.success("To-dos loaded successfully!");
      })
      .catch(() => {
        toast.error("Failed to load to-dos. Please try again.");
      });
  }, [userId]);

  const addTodo = () => {
    if (newTodo.trim() === "") {
      toast.warning("To-do cannot be empty!");
      return;
    }
    axios
      .post("https://dummyjson.com/todos/add", {
        todo: newTodo,
        userId,
        completed: false,
      })
      .then((response) => {
        setTodos((prev) => [...prev, response.data]);
        setNewTodo("");
        toast.success("To-do added successfully!");
      })
      .catch(() => {
        toast.error("Failed to add to-do. Please try again.");
      });
  };

  const deleteTodo = (id) => {
    axios
      .delete(`https://dummyjson.com/todos/${id}`)
      .then(() => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
        toast.info("To-do deleted successfully.");
      })
      .catch(() => {
        toast.error("Failed to delete to-do. Please try again.");
      });
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <h3 className={styles.heading}>To-dos</h3>
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.input}
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new to-do..."
          maxLength={150}
        />
        <button className={styles.addButton} onClick={addTodo}>
          Add To-do
        </button>
      </div>
      <ul className={styles.todosList}>
        {todos.map((todo) => (
          <li key={todo.id} className={styles.todoItem}>
            <div>
              <span className={styles.todoText}>{todo.todo}</span>
            </div>
            <div className={styles.actions}>
              <button
                className={styles.deleteButton}
                onClick={() => deleteTodo(todo.id)}
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserTodos;
