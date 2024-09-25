import React, { useState, useMemo } from "react";
import { TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const TableColumns1 = () => {
  // Define the columns using useMemo for optimization
  const columns = useMemo(
    () => [
      {
        accessorKey: "comment",
        header: "Comment",
        cell: ({ row }) => {
          const [isEditing, setIsEditing] = useState(false); // State to track if the field is being edited
          const [rowValue, setRowValue] = useState(row.original.comment || "null"); // Initial value
          const [error, setError] = useState(false); // Error state for validation

          const handleTextChange = (event) => {
            setRowValue(event.target.value);
          };

          const handleCancelEdit = () => {
            setIsEditing(false);
            setRowValue(row.original.comment || "null"); // Reset to original value on cancel
          };

          const handleEditClick = () => {
            setIsEditing(true);
          };

          return isEditing ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                size="small"
                variant="outlined"
                label="Comment"
                error={error}
                value={rowValue}
                onChange={handleTextChange}
              />
              <IconButton onClick={handleCancelEdit}>
                <CloseIcon />
              </IconButton>
            </div>
          ) : (
            <span onClick={handleEditClick} style={{ cursor: "pointer" }}>
              {row.original.comment || "null"}
            </span>
          );
        },
      },
    ],
    []
  );

  return columns;
};

export default TableColumns1;
