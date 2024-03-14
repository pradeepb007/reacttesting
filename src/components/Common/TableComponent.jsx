import React from "react";

const TableComponent = ({ tableheadings, tableData, OnEdit, OnDelete }) => {
  return (
    <>
      <table width="100%" border="1">
        <thead>
          <tr>
            {tableheadings.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {tableheadings.map((heading, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`}>{row[heading]}</td>
              ))}
              <td>
                <button
                  onClick={() => {
                    OnEdit(row);
                  }}
                >
                  Edit
                </button>
                &nbsp; &nbsp;
                <button
                  onClick={() => {
                    OnDelete(row);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableComponent;
