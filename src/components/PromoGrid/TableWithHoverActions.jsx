import React, { useState } from "react";
import MaterialReactTable, {
  MRT_TableContainer,
  useMaterialReactTable,
} from "material-react-table";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TableWithHoverActions = () => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const columns = PromoGridColumns(validationErrors, handleChange);

  const data = [
    {
      id: 1,
      name: "Mehmet",
      surname: "Baran",
      birthYear: 1987,
      birthCity: "Sanliurfa",
    },
    {
      id: 2,
      name: "Zerya Betül",
      surname: "Baran",
      birthYear: 2017,
      birthCity: "Istanbul",
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    muiTableHeadCellProps: {
      sx: (theme) => ({
        backgroundColor: theme.palette.secondary.main,
      }),
    },
    muiToolbarAlertBannerChipProps: isError
      ? { color: "error", children: "Network Error" }
      : undefined,
    enableEditing: true,
    enableRowActions: false, // Disable built-in row actions
    enableColumnActions: false, // Disable built-in column actions
    manualPagination: true,
    enableRowSelection: true,
    rowCount: rowCount,
    onCreatingRowSave: handleCreate,
    onCreatingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleUpdate,
    onEditingRowCancel: () => setValidationErrors({}),
    onPaginationChange: setPagination,
    initialState: {
      density: "compact",
      showGlobalFilter: true,
      columnPinning: {
        left: ["userId"],
      },
    },
    muiTableBodyRowProps: ({ row }) => ({
      onMouseEnter: () => setHoveredRow(row.id),
      onMouseLeave: () => setHoveredRow(null),
      sx: {
        position: "relative",
      },
    }),
    state: {
      isLoading: isLoading,
      isSaving: isSaving,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      pagination,
    },
  });

  return (
    <MRT_TableContainer table={table}>
      {({ table }) => (
        <MaterialReactTable.Table>
          <MaterialReactTable.TableBody>
            {table.rows.map((row, rowIndex) => (
              <MaterialReactTable.TableRow key={row.id}>
                {table.visibleColumns.map((column, colIndex) => (
                  <MaterialReactTable.TableCell key={`${rowIndex}-${colIndex}`}>
                    {column.render("Cell")}
                    {column.id === "actions" && hoveredRow === row.id && (
                      <Box
                        sx={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          position: "absolute",
                          right: "10px",
                        }}
                      >
                        <IconButton
                          onClick={() => alert("Edit " + row.original.name)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => confirm("Delete " + row.original.name)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    )}
                  </MaterialReactTable.TableCell>
                ))}
              </MaterialReactTable.TableRow>
            ))}
          </MaterialReactTable.TableBody>
        </MaterialReactTable.Table>
      )}
    </MRT_TableContainer>
  );
};

export default TableWithHoverActions;
