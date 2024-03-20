import React from "react";
import { MRT_EditActionButtons } from "material-react-table";

const AddEditRow = ({ title, internalEditComponents, table, row }) => {
  return (
    <>
      <DialogTitle variant="h6">{title}</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {internalEditComponents}
      </DialogContent>
      <DialogActions>
        <MRT_EditActionButtons variant="text" table={table} row={row} />
      </DialogActions>
    </>
  );
};

export default AddEditRow;
