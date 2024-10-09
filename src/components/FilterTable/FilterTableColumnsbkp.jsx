import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { useMemo } from "react";

const FilterTableColumns = ({ data }) => {
  const updatedByOptions = useMemo(() => {
    const options = new Set();
    data.forEach((row) => options.add(row.updatedby));
    return Array.from(options);
  }, [data]);
  const columns = useMemo(
    () => [
      {
        accessorKey: "sector",
        header: "sector",
      },
      {
        accessorKey: "category",
        header: "category",
      },
      {
        accessorKey: "brand",
        header: "Brand",
      },
      {
        accessorKey: "type",
        header: "type",
      },
      {
        accessorKey: "profile",
        header: "profile",
      },
      {
        accessorKey: "updatedby",
        header: "updatedby",
        filterVariant: "autoComplete",
        filterFn: (row, columnIds, filterValue) => {
          if (filterValue.length === 0) return true;
          return filterValue.includes(row.original.updatedby);
        },
        Filter: ({ column }) => (
          <Autocomplete
            multiple
            options={updatedByOptions}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            value={column.getFilterValue() || []}
            onChange={(event, newValue) => column.setFilterValue(newValue)}
            renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props;
              return (
                <li key={key} {...optionProps}>
                  <Checkbox checked={selected} />
                  {option}
                </li>
              );
            }}
            style={{ width: 250 }}
            renderInput={(params) => (
              <TextField {...params} label="select" placeholder="Favorites" />
            )}
          />
        ),
      },
    ],
    []
  );

  return columns;
};

export default FilterTableColumns;
