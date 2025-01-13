import React, { useState } from "react";
import UserTodos from "../UserTodos/UserTodos";
import UserDetails from "../UserDetails/UserDetails";
import styles from "./mainpane.module.css"

function MainPane({ selectedUser }) {
  const [activeTab, setActiveTab] = useState("details");

  if (!selectedUser) {
    return <div className="flex-grow p-4">Select a user to view details</div>;
  }

  return (
    <div className="flex-grow p-4">
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "details" ? styles.active : ""}`}
          onClick={() => setActiveTab("details")}
        >
          User Details
        </button>
        <button
          className={`${styles.tab} ${activeTab === "todos" ? styles.active : ""}`}
          onClick={() => setActiveTab("todos")}
        >
          To-dos
        </button>
      </div>


      {activeTab === "details" && <UserDetails user={selectedUser} />}
      {activeTab === "todos" && <UserTodos userId={selectedUser.id} />}
    </div>
  );
}

export default MainPane;
