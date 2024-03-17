// MaterialTable.js
import React from "react";
import { MRT_TableContainer, MRT_TablePagination } from "material-react-table";
import { Box } from "@mui/material";
import TableRowActions from "./TableRowActions";
import TableContent from "./TableContent";

const MaterialTable = ({ data, onCreate, onUpdate, onDelete }) => {
  return (
    <Box>
      <TableContent data={data} onCreate={onCreate} onUpdate={onUpdate} />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <MRT_TablePagination />
      </Box>
      <Box sx={{ display: "grid", width: "100%" }}>
        <TableRowActions onDelete={onDelete} />
      </Box>
    </Box>
  );
};

export default MaterialTable;
