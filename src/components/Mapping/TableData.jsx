import React, { useState, useEffect } from "react";

function TableData() {
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const usersData = await getUsers();
  //       setUsers(usersData);
  //     } catch (error) {
  //       throw error;
  //     }
  //   };
  //   fetchData();
  // }, []); // Adding empty dependency array to run useEffect only once

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        throw err;
      }
    };
    fetchAllUsers();
  }, []);

  return (
    <div className="container">
      <h1>Users</h1>

      <table border={1} cellPadding={0} cellSpacing={0} width="100%">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableData;
