import React, { useState, useMemo } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// EditableCell component to handle state and editing UI
const EditableCell = ({ value: initialValue, onCancelEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [rowValue, setRowValue] = useState(initialValue || "null"); // Initial value
  const [error, setError] = useState(false); // Error state for validation

  const handleTextChange = (event) => {
    setRowValue(event.target.value);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setRowValue(initialValue || "null"); // Reset to original value on cancel
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return isEditing ? (
    <TextField
      size="small"
      variant="outlined"
      label="Comment"
      error={error}
      value={rowValue}
      onChange={handleTextChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleCancelEdit}>
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  ) : (
    <span onClick={handleEditClick} style={{ cursor: "pointer" }}>
      {rowValue}
    </span>
  );
};

const TableColumns1 = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "comment",
        header: "Comment",
        cell: ({ row }) => {
          return (
            <EditableCell
              value={row.original.comment}
              onCancelEdit={() => {
                console.log("Edit cancelled");
              }}
            />
          );
        },
      },
    ],
    []
  );

  return columns;
};

export default TableColumns1;
