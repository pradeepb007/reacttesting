import React from "react";
import BlankExcelDownload from "./BlankExcelDownload";
import ExcelwithDataDownload from "./ExcelwithDataDownload";
import UploadExcelData from "./UploadExcelData";
import { Box, Button, Typography } from "@mui/material";

const PageHeader = ({ table, title, subtitle }) => {
  return (
    <Box className="p-2">
      <Typography variant="h6" as="h2">
        {title}
      </Typography>
      <Typography>{subtitle}</Typography>
      <Button
        color="primary"
        onClick={() => {
          table.setCreatingRow(true);
        }}
        variant="contained"
      >
        Crete New Account
      </Button>

      <BlankExcelDownload />
      <UploadExcelData color="primary">Upload new Data</UploadExcelData>
      <ExcelwithDataDownload />
      <UploadExcelData color="primary">Upload new Data</UploadExcelData>
    </Box>
  );
};

export default PageHeader;
