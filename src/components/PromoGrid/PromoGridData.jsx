import React, { useState, useEffect } from "react";
import {
  MRT_TablePagination,
  useMaterialReactTable,
  MRT_TableContainer,
} from "material-react-table";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  addNewRowData,
  updateRowData,
  deleteRowData,
} from "../../api/promoGridApi";

import { setPromoData } from "./promoGridSlice";

import { handleChangeValidate, handleValidate } from "/src/utils/commonMethods";
import AddEditRow from "./AddEditRow";
import PromoGridColumns from "./PromoGridColumns";
import RowActions from "../Common/RowActions";
import PageSection from "../Common/PageSection";
import PageHeader from "../Common/PageHeader";

const PromoGridData = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const tableData = useSelector((state) => state.promoData.promoData);

  const dispatch = useDispatch();

  const fetchData = async () => {
    const response = await getData();
    dispatch(setPromoData(response));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  //CREATE action
  const handleCreate = async ({ values, table }) => {
    const newValidationErrors = validateData(values);
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
    const newValidationErrors = validateData(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});

    await dispatch(updateRowData(row.original.id, values));
    table.setEditingRow(null); //exit editing mode
    fetchData(); // Reload data after editing
  };

  //DELETE action
  const handleDelete = async (row) => {
    if (window.confirm("Are you sure you want to delete this data?")) {
      await dispatch(deleteRowData(row.original.id));
    }
    fetchData(); // Reload data after deleting
  };

  const handleChange = (event, validationType, accessorkey) => {
    let errorMessage = handleChangeValidate(event, validationType);
    setValidationErrors({
      ...validationErrors,
      [accessorkey]: errorMessage,
    });
  };

  const validateData = (data) => {
    return {
      goldenCustomerId: handleValidate(
        "integerValidation",
        " required",
        data.goldenCustomerId
      ),
      eventType: handleValidate(
        "stringValidation",
        " required",
        data.eventType
      ),
    };
  };

  const table = useMaterialReactTable({
    columns: PromoGridColumns(validationErrors, handleChange),
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
      <AddEditRow
        title="Add"
        table={table}
        row={row}
        internalEditComponents={internalEditComponents}
      />
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <AddEditRow
        title="Edit"
        table={table}
        row={row}
        internalEditComponents={internalEditComponents}
      />
    ),
    renderRowActions: ({ row, table }) => (
      <RowActions table={table} row={row} handleDelete={handleDelete} />
    ),
  });

  return (
    <PageSection>
      <PageHeader table={table} titile="promogrid" subtitile="promogrid" />
      <MRT_TableContainer table={table} />
      <MRT_TablePagination table={table} />
    </PageSection>
  );
};

export default PromoGridData;
