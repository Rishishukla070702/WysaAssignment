import React, { useEffect, useState } from "react";
import axios from "axios";

function Sidebar({ setSelectedUser }) {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userData = await axios.get("https://dummyjson.com/users");
      setUsers(userData.data.users);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  );

  return (
    <div className="w-1/4 bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Users List</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={searchValue}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <ul>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li
              key={user.id}
              className="p-2 cursor-pointer hover:bg-gray-300"
              onClick={() => setSelectedUser(user)}
            >
              {user.firstName} {user.lastName}
            </li>
          ))
        ) : (
          <li className="p-2 text-gray-500">No users found</li>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
