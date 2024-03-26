import React from "react";

const DatePickerComponent = ({ row, column, accesskey }) => {
  const value = row.original[accesskey];
  const initialValue = value ? moment(value, "MM/DD/YYYY") : null;
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        aria-labelledby={`${accesskey}-label`}
        onChange={(newValue) => {
          row._valuesCache[column.id] = moment(newValue).format("MM/DD/YYYY");
        }}
        label={column.columnDef.header}
        value={initialValue}
        slotProps={{ textField: { size: "small" } }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
