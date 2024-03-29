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
  downloadDataExcel,
  downloadBlankExcel,
  uploadExcel,
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

  const [isLoading, setIsLoading] = useState(true);

  const [rowCount, setRowCount] = useState(0);

  const [isSaving, setIsSaving] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const dispatch = useDispatch();

  const fetchData = async () => {
    const response = await getData();
    dispatch(setPromoData(response.results));
    setIsLoading(false);
    setRowCount(response.setRowCount);
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  //CREATE action
  const handleCreate = async ({ values, table }) => {
    setIsSaving(true);
    const newValidationErrors = validateData(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      setIsSaving(false);
      return;
    }
    setValidationErrors({});

    // Add new row data
    await dispatch(addNewRowData(values));
    table.setCreatingRow(null); //exit creating mode
    fetchData(); // Reload data after editing
    setIsSaving(false);
  };

  //UPDATE action
  const handleUpdate = async ({ values, table, row }) => {
    setIsSaving(true);
    const newValidationErrors = validateData(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      setIsSaving(false);
      return;
    }
    setValidationErrors({});

    await dispatch(updateRowData(row.original.id, values));

    table.setEditingRow(null); //exit editing mode
    fetchData(); // Reload data after editing
    setIsSaving(false);
  };

  //DELETE action
  const handleDelete = async (row) => {
    if (window.confirm("Are you sure you want to delete this data?")) {
      setIsSaving(true);
      await dispatch(deleteRowData(row.original.id));
      setIsSaving(false);
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

  const handleDownloadBlankExcel = async () => {
    try {
      await downloadBlankExcel();
      setIsSnackOpen(true);
      setSnackBar({
        message: "File uploaded successfully",
        severity: "success",
      });
    } catch (error) {
      setIsSnackOpen(true);
      setSnackBar({
        message: "File uploaded fialed",
        severity: "error",
      });
    }
  };

  const handleDataDownloadExcel = async () => {
    await downloadDataExcel();
  };

  const handleUploadExcel = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        if (
          file.type !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          setIsDataLoading(true);
          const formData = new FormData();
          formData.append("file", file);
          await uploadExcel(formData);
          setIsSnackOpen(true);
          setSnackBar({
            message: "File uploaded successfully",
            severity: "success",
          });
          setIsDataLoading(false);
          fetchData();
          event.target.value = null;
        } else {
          alert("Please select an Excel file");
        }
      } else {
        alert("Please select a file");
      }
    } catch (error) {
      setIsSnackOpen(true);
      setSnackBar({
        message: "File uploaded fialed",
        severity: "error",
      });
    }
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
    manualPagination: true,
    rowCount: rowCount,
    getRowId: (row) => row.id,
    onCreatingRowSave: handleCreate,
    onCreatingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleUpdate,
    onEditingRowCancel: () => setValidationErrors({}),
    onPaginationChange: setPagination,
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
    state: {
      isLoading: isLoading,
      isSaving: isSaving,
      pagination,
    },
  });

  return (
    <PageSection>
      <PageHeader
        table={table}
        titile="promogrid"
        subtitile="promogrid"
        handleDataDownloadExcel={handleDataDownloadExcel}
        handleDownloadBlankExcel={handleDownloadBlankExcel}
        handleUploadExcel={handleUploadExcel}
        isDataLoading={isDataLoading}
      />
      <MRT_TableContainer table={table} />
      <MRT_TablePagination table={table} />
    </PageSection>
  );
};

export default PromoGridData;
