import {
  MRT_TableContainer,
  useMaterialReactTable,
} from "material-react-table";
import React, { useMemo } from "react";
import FilterTableColumns from "./FilterTableColumns";

const FilterTable = () => {
  const data = useMemo(
    () => [
      {
        sector: "Sector 1",
        category: "Category 1",
        brand: "Brand 1",
        type: "Type 1",
        profile: "profile 1",
        updatedby: "user 1",
      },
      {
        sector: "Sector 2",
        category: "Category 2",
        brand: "Brand 2",
        type: "Type 2",
        profile: "profile 2",
        updatedby: "user 2",
      },
      {
        sector: "Sector 3",
        category: "Category 3",
        brand: "Brand 3",
        type: "Type 3",
        profile: "profile 3",
        updatedby: "user 3",
      },
      {
        sector: "Sector 4",
        category: "Category 4",
        brand: "Brand 4",
        type: "Type 4",
        profile: "profile 4",
        updatedby: "user 4",
      },
      {
        sector: "Sector 5",
        category: "Category 5",
        brand: "Brand 5",
        type: "Type 5",
        profile: "profile 5",
        updatedby: "user 5",
      },
      {
        sector: "Sector 1",
        category: "Category 2",
        brand: "Brand 3",
        type: "Type 4",
        profile: "profile 5",
        updatedby: "user 1",
      },
      {
        sector: "Sector 2",
        category: "Category 3",
        brand: "Brand 4",
        type: "Type 5",
        profile: "profile 2",
        updatedby: "user 2",
      },
      {
        sector: "Sector 1",
        category: "Category 3",
        brand: "Brand 2",
        type: "Type 2",
        profile: "profile 2",
        updatedby: "user 3",
      },

      {
        sector: "Sector 3",
        category: "Category 4",
        brand: "Brand 5",
        type: "Type 1",
        profile: "profile 1",
        updatedby: "user 4",
      },
      {
        sector: "Sector 1",
        category: "Category 1",
        brand: "Brand 1",
        type: "Type 1",
        profile: "profile 1",
        updatedby: "user 1",
      },

      {
        sector: "Sector 2",
        category: "Category 2",
        brand: "Brand 3",
        type: "Type 3",
        profile: "profile 3",
        updatedby: "user 1",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns: FilterTableColumns({ data }),
    data,
    enableSorting: false,
    enableColumnActions: false,
    enableFacetedValues: true,
    columnFilterDisplayMode: "popover",
    initialState: {
      showColumnFilters: true,
      density: "compact",
    },
  });
  return (
    <div style={{ margin: "50px 0px" }}>
      <MRT_TableContainer table={table} />
    </div>
  );
};

export default FilterTable;
