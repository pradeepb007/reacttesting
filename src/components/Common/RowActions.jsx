import React from "react";

const RowActions = ({ row, table, handleDelete }) => {
  return (
    <Box sx={{ display: "flex", gap: "1rem" }}>
      <Tooltip title="Edit">
        <IconButton onClick={() => table.setEditingRow(row)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton color="error" onClick={() => handleDelete(row)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default RowActions;
