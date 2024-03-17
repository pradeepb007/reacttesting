// TableRowActions.js
import React from "react";
import { Box, Tooltip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TableRowActions = ({ onDelete }) => {
  return (
    <Box sx={{ display: "flex", gap: "1rem" }}>
      <Tooltip title="Edit">
        <IconButton>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton color="error" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default TableRowActions;
