import React, { useState, useEffect } from "react";
import { getUsers, updateUser, createUser } from "../services/api";
import * as XLSX from "xlsx";

const ExampleComponent = ({ onError }) => {
  const [users, setUsers] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
        setTableData(usersData.map((user) => ({ ...user, isEditing: false })));
      } catch (error) {
        onError(error);
      }
    };
    fetchData();
  }, [onError]);

  const handleExcelUpload = async (e) => {
    const file = e.target.files[0];
    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        // Assuming data structure: [ID, Name, Username, Email]
        const newData = excelData.slice(1).map((row) => ({
          id: row[0],
          name: row[1],
          username: row[2],
          email: row[3],
        }));
        // Update table data with new data from Excel
        setUsers(newData);
        // Remove rows from table if they are not present in Excel data
        const updatedTableData = tableData.filter((user) =>
          newData.some((excelUser) => excelUser.id === user.id)
        );
        setTableData(
          updatedTableData.map((user) => ({ ...user, isEditing: false }))
        );
        setIsUploading(false);
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error parsing Excel:", error);
      setIsUploading(false);
    }
  };

  const handleAddRow = () => {
    setTableData([
      ...tableData,
      { id: "", name: "", username: "", email: "", isEditing: true },
    ]);
  };

  const handleEdit = (index) => {
    const updatedTableData = [...tableData];
    updatedTableData[index].isEditing = true;
    setTableData(updatedTableData);
  };

  const handleCancel = (index) => {
    const updatedTableData = [...tableData];
    if (!updatedTableData[index].id) {
      updatedTableData.splice(index, 1);
    } else {
      updatedTableData[index].isEditing = false;
    }
    setTableData(updatedTableData);
  };

  const handleSave = async (index) => {
    const user = tableData[index];
    try {
      if (user.id) {
        // Existing user, update data
        await updateUser(user.id, user);
      } else {
        // New row, insert data
        const newUser = await createUser(user); // Implement createUser function in your API
        user.id = newUser.id;
      }
      const updatedTableData = [...tableData];
      updatedTableData[index].isEditing = false;
      setTableData(updatedTableData);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDownloadExcel = () => {
    const header = ["ID", "Name", "Username", "Email"];
    const data = tableData.map((user) => [
      user.id,
      user.name,
      user.username,
      user.email,
    ]);
    const ws = XLSX.utils.aoa_to_sheet([header, ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "users.xlsx");
  };

  return (
    <div className="container">
      <h1>Users</h1>
      <input type="file" accept=".xlsx,.xls" onChange={handleExcelUpload} />
      {isUploading && <div>Uploading...</div>}
      <button onClick={handleAddRow}>Add Row</button>
      <button onClick={handleDownloadExcel}>Download Excel</button>
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
          {tableData.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>
                {user.isEditing ? (
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => {
                      const updatedTableData = [...tableData];
                      updatedTableData[index].name = e.target.value;
                      setTableData(updatedTableData);
                    }}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {user.isEditing ? (
                  <input
                    type="text"
                    value={user.username}
                    onChange={(e) => {
                      const updatedTableData = [...tableData];
                      updatedTableData[index].username = e.target.value;
                      setTableData(updatedTableData);
                    }}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {user.isEditing ? (
                  <input
                    type="text"
                    value={user.email}
                    onChange={(e) => {
                      const updatedTableData = [...tableData];
                      updatedTableData[index].email = e.target.value;
                      setTableData(updatedTableData);
                    }}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {user.isEditing ? (
                  <>
                    <button onClick={() => handleSave(index)}>Save</button>
                    <button onClick={() => handleCancel(index)}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(index)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExampleComponent;
