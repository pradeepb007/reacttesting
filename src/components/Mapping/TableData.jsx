import React, { useState, useEffect } from "react";
import { getUsers } from "../../api/api";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../Common/ErrorFallback";

function TableData() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        setError(error); // Set error state instead of throwing
      }
    };
    fetchData();
  }, []); // Adding empty dependency array to run useEffect only once

  if (error) {
    // Handle the error here, display a message or fallback UI
    return (
      <div>
        <p>Something went wrong: {error.message}</p>
        <ErrorFallback />
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Users</h1>

      <table border={1} cellPadding={0} cellSpacing={0} width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td> {/* Fix typo here */}
              <td>
                <button type="button">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableData;
