// StoreToDcTable.js
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import DataTable from "./DataTable";

const StoreToDcTable = () => {
  return (
    <Box className="h-full w-full">
      <Button color="primary" variant="contained">
        Create New Account
      </Button>
      <Typography p="16px 4px">
        {
          "Hey I'm some page content. I'm just one of your normal components between your custom toolbar and the MRT Table below"
        }
      </Typography>
      <DataTable />
    </Box>
  );
};

export default StoreToDcTable;
