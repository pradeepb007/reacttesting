import React, { useMemo, useState, useEffect } from "react";
import {
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  useMaterialReactTable,
  MRT_TableContainer,
  MRT_EditActionButtons,
} from "material-react-table";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  addNewRowData,
  updateRowData,
  deleteRowData,
} from "../../api/storeApi";
import { getBrands, getCategories, getSubsectors } from "../../api/api";
import { setStoreData } from "./storeDcSlice";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

const StoreToDcTable = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const tableData = useSelector((state) => state.storeData.storeData);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subsectors, setSubsectors] = useState([]);

  const currentDate = moment().format("MM/DD/YYYY");
  const dispatch = useDispatch();

  const fetchData = async () => {
    const response = await getData();
    dispatch(setStoreData(response));
    // const brandData = await getBrands();
    // setBrands(brandData);
    // const categoryData = await getCategories();
    // setCategories(categoryData);
    // const subSectorData = await getSubsectors();
    // setSubsectors(subSectorData);
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  //CREATE action
  const handleCreate = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});

    // Add new row data
    await dispatch(addNewRowData(values));
    table.setCreatingRow(null); //exit creating mode
    fetchData(); // Reload data after editing
  };

  //UPDATE action
  const handleUpdate = async ({ values, table, row }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    // Set default values
    const newValues = {
      ...values,
    };
    if (JSON.stringify(newValues) !== JSON.stringify(row.original)) {
      newValues.modifiedDate = currentDate;
    }

    await dispatch(updateRowData(row.original.id, newValues));
    table.setEditingRow(null); //exit editing mode
    fetchData(); // Reload data after editing
  };

  //DELETE action
  const handleDelete = async (row) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await dispatch(deleteRowData(row.original.id));
    }
    fetchData(); // Reload data after deleting
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 40,
        Edit: () => null,
      },
      {
        accessorKey: "custID",
        header: "Cust Id",
        muiEditTextFieldProps: {
          required: true,
          variant: "outlined",
          error: !!validationErrors?.custID,
          helperText: validationErrors?.custID,
          onChange: (event) => {
            const newValue = event.target.value;
            if (!validateInteger(newValue)) {
              setValidationErrors({
                ...validationErrors,
                custID: "Must be a number",
              });
            } else {
              setValidationErrors({
                ...validationErrors,
                custID: undefined,
              });
            }
          },
        },
      },
      {
        accessorKey: "dateFrom",
        header: "Date From",
        Edit: ({ column, row }) => {
          const initialValue = row.original.dateFrom
            ? moment(row.original.dateFrom, "MM/DD/YYYY")
            : null;
          return (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                onChange={(newValue) => {
                  row._valuesCache[column.id] =
                    moment(newValue).format("MM/DD/YYYY");
                }}
                label={column.columnDef.header}
                value={initialValue}
                slotProps={{ textField: { size: "small" } }}
              />
            </LocalizationProvider>
          );
        },
      },
      {
        accessorKey: "dateTo",
        header: "Date To",
        Edit: ({ column, row }) => {
          const initialValue = row.original.dateFrom
            ? moment(row.original.dateFrom, "MM/DD/YYYY")
            : null;
          return (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                onChange={(newValue) => {
                  row._valuesCache[column.id] =
                    moment(newValue).format("MM/DD/YYYY");
                }}
                label={column.columnDef.header}
                value={initialValue}
                slotProps={{ textField: { size: "small" } }}
              />
            </LocalizationProvider>
          );
        },
      },
      {
        accessorKey: "dcID",
        header: "DC Id",
        muiEditTextFieldProps: {
          required: true,
          variant: "outlined",
          error: !!validationErrors?.dcID,
          helperText: validationErrors?.dcID,
          onChange: (event) => {
            const newValue = event.target.value;
            if (!validateInteger(newValue)) {
              setValidationErrors({
                ...validationErrors,
                dcID: "Must be a number",
              });
            } else {
              setValidationErrors({
                ...validationErrors,
                dcID: undefined,
              });
            }
          },
        },
      },
      {
        accessorKey: "storeID",
        header: "Store Id",
        muiEditTextFieldProps: {
          required: true,
          variant: "outlined",
          error: !!validationErrors?.storeID,
          helperText: validationErrors?.storeID,
          onChange: (event) => {
            const newValue = event.target.value;
            if (!validateInteger(newValue)) {
              setValidationErrors({
                ...validationErrors,
                storeID: "Must be a number",
              });
            } else {
              setValidationErrors({
                ...validationErrors,
                storeID: undefined,
              });
            }
          },
        },
      },
      {
        accessorKey: "fraction",
        header: "Fraction",
        muiEditTextFieldProps: {
          required: true,
          variant: "outlined",
          error: !!validationErrors?.fraction,
          helperText: validationErrors?.fraction,
          onChange: (event) => {
            const newValue = event.target.value;
            if (!validateFloat(newValue)) {
              setValidationErrors({
                ...validationErrors,
                fraction: "Must be a Float number",
              });
            } else {
              setValidationErrors({
                ...validationErrors,
                fraction: undefined,
              });
            }
          },
        },
      },

      {
        accessorKey: "gtin",
        header: "GTIN",
        muiEditTextFieldProps: {
          type: "number",
          variant: "outlined",
        },
      },
      {
        accessorKey: "createdBy",
        header: "Created By",
        Edit: () => null,
      },
      {
        accessorKey: "createdDate",
        header: "Created Date",
        Edit: () => null,
      },
      {
        accessorKey: "modifiedBy",
        header: "Modified By",
        Edit: () => null,
      },
      {
        accessorKey: "modifiedDate",
        header: "Modified Date",
        Edit: () => null,
      },
    ],

    [validationErrors, brands, categories, subsectors]
  );

  const table = useMaterialReactTable({
    columns,
    data: tableData,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    muiTableHeadCellProps: {
      //no useTheme hook needed, just use the `sx` prop with the theme callback
      sx: (theme) => ({
        backgroundColor: theme.palette.secondary.main,
      }),
    },
    enableEditing: true,
    enableColumnPinning: true,
    enableRowActions: true,
    enableColumnActions: false,
    getRowId: (row) => row.id,
    onCreatingRowSave: handleCreate,
    onCreatingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleUpdate,
    onEditingRowCancel: () => setValidationErrors({}),
    initialState: {
      density: "compact",
      showGlobalFilter: true,
      columnPinning: {
        right: ["mrt-row-actions"],
      },
    },
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit User</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
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
    ),
  });

  return (
    <Box className="h-full w-full">
      <Button
        color="primary"
        onClick={() => {
          table.setCreatingRow(true);
        }}
        variant="contained"
      >
        Crete New Account
      </Button>

      <Typography p="16px 4px">
        {
          "Hey I'm some page content. I'm just one of your normal components between your custom toolbar and the MRT Table below"
        }
      </Typography>

      <MRT_TableContainer table={table} />

      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <MRT_TablePagination table={table} />
        </Box>
        <Box sx={{ display: "grid", width: "100%" }}>
          <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
        </Box>
      </Box>
    </Box>
  );
};

export default StoreToDcTable;

const validateRequired = (value) => !!value.length;
const validateInteger = (value) => value.match(/^[0-9]+$/);
const validateFloat = (value) => value.match(/^[0-9]+\.[0-9]+$/);

function validateUser(user) {
  return {
    custID: validateCustID(user.custID),
    dcID: validateDcId(user.dcID),
    storeID: validateStoreID(user.storeID),
    fraction: validateFraction(user.fraction),
  };
}

function validateCustID(custID) {
  let errorMessage = "";

  if (!validateRequired(custID)) {
    errorMessage += "custID is Required. ";
  }

  if (!validateInteger(custID)) {
    errorMessage += "custID must be an integer. ";
  }

  return errorMessage;
}

function validateDcId(dcID) {
  let errorMessage = "";

  if (!validateRequired(dcID)) {
    errorMessage += "DC ID is Required. ";
  }

  if (!validateInteger(dcID)) {
    errorMessage += "DC ID must be an integer. ";
  }

  return errorMessage;
}

function validateStoreID(storeID) {
  let errorMessage = "";

  if (!validateRequired(storeID)) {
    errorMessage += "store ID is Required. ";
  }

  if (!validateInteger(storeID)) {
    errorMessage += "Store ID must be an integer. ";
  }

  return errorMessage;
}

function validateFraction(fraction) {
  let errorMessage = "";

  if (!validateRequired(fraction)) {
    errorMessage += "fraction is Required. ";
  }

  if (!validateFloat(fraction)) {
    errorMessage += "fraction must be a float. ";
  }

  return errorMessage;
}
