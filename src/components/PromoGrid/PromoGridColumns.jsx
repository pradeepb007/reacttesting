import React, { useMemo } from "react";

const PromoGridColumns = (validationErrors, handleChnage) =>
  useMemo(
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
            handleChnage(event, "integerValidation", "custID");
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

    [validationErrors]
  );

export default PromoGridColumns;
