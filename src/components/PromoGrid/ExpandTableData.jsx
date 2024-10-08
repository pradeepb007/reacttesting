import React, { useMemo } from "react";
import {
  useMaterialReactTable,
  MRT_TableContainer,
} from "material-react-table";

const ExpandTable = () => {
  const data = useMemo(
    () => [
      {
        profile: "Profile A",
        subRows: [
          {
            firstName: "Ervin",
            lastName: "Reinger",
            address: "566 Brakus Inlet",
          },
          {
            firstName: "Brittany",
            lastName: "McCullough",
            address: "722 Emie Stream",
          },
        ],
      },
      {
        profile: "Profile B",
        subRows: [
          {
            firstName: "Branson",
            lastName: "Frami",
            address: "32188 Larkin Turnpike",
          },
        ],
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "profile",
        header: "Profile Name",
        Cell: ({ row }) => (
          <span>
            {row.depth === 0
              ? row.original.profile
              : `${row.original.firstName} ${row.original.lastName}`}
          </span>
        ),
      },
      {
        accessorKey: "firstName",
        header: "First Name",
        enableHiding: true,
        Cell: ({ row }) => (row.depth > 0 ? row.original.firstName : null),
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        enableHiding: true,
        Cell: ({ row }) => (row.depth > 0 ? row.original.lastName : null),
      },
      {
        accessorKey: "address",
        header: "Address",
        enableHiding: true,
        Cell: ({ row }) => (row.depth > 0 ? row.original.address : null),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableExpanding: true,
    getSubRows: (row) => row.subRows,
  });

  return <MRT_TableContainer table={table} />;
};

export default ExpandTable;
