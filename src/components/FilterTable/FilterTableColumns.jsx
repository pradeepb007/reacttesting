import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { useMemo, useState } from "react";

const FilterTableColumns = ({ data }) => {
  // State to manage all filter values
  const [filters, setFilters] = useState({
    updatedby: [],
    category: [],
    brand: [],
    sector: [],
    type: [],
    profile: [],
  });

  // Function to dynamically get unique options based on filters
  const getOptions = (key) => {
    const options = new Set();
    data.forEach((row) => {
      // Check if the row matches all other filters before adding the option
      const isMatch = Object.keys(filters).every((filterKey) => {
        // Skip if the filterKey matches the current column or is empty
        if (filterKey === key || filters[filterKey].length === 0) {
          return true;
        }
        return filters[filterKey].includes(row[filterKey]);
      });

      if (isMatch) {
        options.add(row[key]);
      }
    });
    return Array.from(options);
  };

  // Memoized options for each filter based on current filter values
  const updatedByOptions = useMemo(() => getOptions("updatedby"), [filters]);
  const categoryOptions = useMemo(() => getOptions("category"), [filters]);
  const brandOptions = useMemo(() => getOptions("brand"), [filters]);
  const sectorOptions = useMemo(() => getOptions("sector"), [filters]);
  const typeOptions = useMemo(() => getOptions("type"), [filters]);
  const profileOptions = useMemo(() => getOptions("profile"), [filters]);

  // Common function to render the Autocomplete filter
  const renderAutocompleteFilter =
    (columnKey, options) =>
    ({ column }) =>
      (
        <Autocomplete
          multiple
          options={options}
          disableCloseOnSelect
          getOptionLabel={(option) => option}
          value={column.getFilterValue() || []}
          onChange={(event, newValue) => {
            setFilters((prev) => ({ ...prev, [columnKey]: newValue }));
            column.setFilterValue(newValue);
          }}
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
            <TextField {...params} label={columnKey} placeholder="Select" />
          )}
        />
      );

  const columns = useMemo(
    () => [
      {
        accessorKey: "sector",
        header: "Sector",
        filterVariant: "autoComplete",
        filterFn: (row, columnIds, filterValue) => {
          if (filterValue.length === 0) return true;
          return filterValue.includes(row.original.sector);
        },
        Filter: renderAutocompleteFilter("sector", sectorOptions),
      },
      {
        accessorKey: "category",
        header: "Category",
        filterVariant: "autoComplete",
        filterFn: (row, columnIds, filterValue) => {
          if (filterValue.length === 0) return true;
          return filterValue.includes(row.original.category);
        },
        Filter: renderAutocompleteFilter("category", categoryOptions),
      },
      {
        accessorKey: "brand",
        header: "Brand",
        filterVariant: "autoComplete",
        filterFn: (row, columnIds, filterValue) => {
          if (filterValue.length === 0) return true;
          return filterValue.includes(row.original.brand);
        },
        Filter: renderAutocompleteFilter("brand", brandOptions),
      },
      {
        accessorKey: "type",
        header: "Type",
        filterVariant: "autoComplete",
        filterFn: (row, columnIds, filterValue) => {
          if (filterValue.length === 0) return true;
          return filterValue.includes(row.original.type);
        },
        Filter: renderAutocompleteFilter("type", typeOptions),
      },
      {
        accessorKey: "profile",
        header: "Profile",
        filterVariant: "autoComplete",
        filterFn: (row, columnIds, filterValue) => {
          if (filterValue.length === 0) return true;
          return filterValue.includes(row.original.profile);
        },
        Filter: renderAutocompleteFilter("profile", profileOptions),
      },
      {
        accessorKey: "updatedby",
        header: "Updated By",
        filterVariant: "autoComplete",
        filterFn: (row, columnIds, filterValue) => {
          if (filterValue.length === 0) return true;
          return filterValue.includes(row.original.updatedby);
        },
        Filter: renderAutocompleteFilter("updatedby", updatedByOptions),
      },
    ],
    [
      updatedByOptions,
      categoryOptions,
      brandOptions,
      sectorOptions,
      typeOptions,
      profileOptions,
    ]
  );

  return columns;
};

export default FilterTableColumns;
