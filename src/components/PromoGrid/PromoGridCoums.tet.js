import { renderHook } from "@testing-library/react-hooks";
import PromoGridColumns from "./PromoGridColumns";
import moment from "moment";

describe("PromoGridColumns", () => {
  test("returns correct columns", () => {
    const validationErrors = {};
    const handleChnage = jest.fn();

    const { result } = renderHook(() =>
      PromoGridColumns(validationErrors, handleChnage)
    );

    const columns = result.current;

    // Test for all columns
    expect(columns).toHaveLength(13);

    // Test for id column
    const idColumn = columns.find((column) => column.accessorKey === "id");
    expect(idColumn).toBeDefined();
    expect(idColumn.header).toBe("Id");
    expect(idColumn.enableEditing).toBe(false);
    expect(idColumn.size).toBe(40);
    expect(idColumn.Edit).toBeInstanceOf(Function);

    // Test for custID column
    const custIDColumn = columns.find(
      (column) => column.accessorKey === "custID"
    );
    expect(custIDColumn).toBeDefined();
    expect(custIDColumn.header).toBe("Cust Id");
    expect(custIDColumn.muiEditTextFieldProps.required).toBe(true);
    expect(custIDColumn.muiEditTextFieldProps.variant).toBe("outlined");
    expect(custIDColumn.muiEditTextFieldProps.error).toBe(false);
    expect(custIDColumn.muiEditTextFieldProps.helperText).toBe(undefined);
    expect(custIDColumn.muiEditTextFieldProps.onChange).toBeInstanceOf(
      Function
    );

    // Test for dateFrom column
    const dateFromColumn = columns.find(
      (column) => column.accessorKey === "dateFrom"
    );
    expect(dateFromColumn).toBeDefined();
    expect(dateFromColumn.header).toBe("Date From");
    expect(dateFromColumn.Edit).toBeInstanceOf(Function);

    // Test for dateTo column
    const dateToColumn = columns.find(
      (column) => column.accessorKey === "dateTo"
    );
    expect(dateToColumn).toBeDefined();
    expect(dateToColumn.header).toBe("Date To");
    expect(dateToColumn.Edit).toBeInstanceOf(Function);

    // Test for dcID column
    const dcIDColumn = columns.find((column) => column.accessorKey === "dcID");
    expect(dcIDColumn).toBeDefined();
    expect(dcIDColumn.header).toBe("DC Id");
    expect(dcIDColumn.muiEditTextFieldProps.required).toBe(true);
    expect(dcIDColumn.muiEditTextFieldProps.variant).toBe("outlined");
    expect(dcIDColumn.muiEditTextFieldProps.error).toBe(false);
    expect(dcIDColumn.muiEditTextFieldProps.helperText).toBe(undefined);
    expect(dcIDColumn.muiEditTextFieldProps.onChange).toBeInstanceOf(Function);

    // Test for storeID column
    const storeIDColumn = columns.find(
      (column) => column.accessorKey === "storeID"
    );
    expect(storeIDColumn).toBeDefined();
    expect(storeIDColumn.header).toBe("Store Id");
    expect(storeIDColumn.muiEditTextFieldProps.required).toBe(true);
    expect(storeIDColumn.muiEditTextFieldProps.variant).toBe("outlined");
    expect(storeIDColumn.muiEditTextFieldProps.error).toBe(false);
    expect(storeIDColumn.muiEditTextFieldProps.helperText).toBe(undefined);
    expect(storeIDColumn.muiEditTextFieldProps.onChange).toBeInstanceOf(
      Function
    );

    // Test for fraction column
    const fractionColumn = columns.find(
      (column) => column.accessorKey === "fraction"
    );
    expect(fractionColumn).toBeDefined();
    expect(fractionColumn.header).toBe("Fraction");
    expect(fractionColumn.muiEditTextFieldProps.required).toBe(true);
    expect(fractionColumn.muiEditTextFieldProps.variant).toBe("outlined");
    expect(fractionColumn.muiEditTextFieldProps.error).toBe(false);
    expect(fractionColumn.muiEditTextFieldProps.helperText).toBe(undefined);
    expect(fractionColumn.muiEditTextFieldProps.onChange).toBeInstanceOf(
      Function
    );

    // Test for gtin column
    const gtinColumn = columns.find((column) => column.accessorKey === "gtin");
    expect(gtinColumn).toBeDefined();
    expect(gtinColumn.header).toBe("GTIN");
    expect(gtinColumn.muiEditTextFieldProps.type).toBe("number");
    expect(gtinColumn.muiEditTextFieldProps.variant).toBe("outlined");

    // Test for createdBy column
    const createdByColumn = columns.find(
      (column) => column.accessorKey === "createdBy"
    );
    expect(createdByColumn).toBeDefined();
    expect(createdByColumn.header).toBe("Created By");
    expect(createdByColumn.Edit).toBeInstanceOf(Function);

    // Test for createdDate column
    const createdDateColumn = columns.find(
      (column) => column.accessorKey === "createdDate"
    );
    expect(createdDateColumn).toBeDefined();
    expect(createdDateColumn.header).toBe("Created Date");
    expect(createdDateColumn.Edit).toBeInstanceOf(Function);

    // Test for modifiedBy column
    const modifiedByColumn = columns.find(
      (column) => column.accessorKey === "modifiedBy"
    );
    expect(modifiedByColumn).toBeDefined();
    expect(modifiedByColumn.header).toBe("Modified By");
    expect(modifiedByColumn.Edit).toBeInstanceOf(Function);

    // Test for modifiedDate column
    const modifiedDateColumn = columns.find(
      (column) => column.accessorKey === "modifiedDate"
    );
    expect(modifiedDateColumn).toBeDefined();
    expect(modifiedDateColumn.header).toBe("Modified Date");
    expect(modifiedDateColumn.Edit).toBeInstanceOf(Function);
  });
});

// ... existing code ...

// Test for all columns
expect(columns).toHaveLength(13);

// Test for id column
const idColumn = columns.find((column) => column.accessorKey === "id");
expect(idColumn).toBeDefined();
expect(idColumn.header).toBe("Id");
expect(idColumn.enableEditing).toBe(false);
expect(idColumn.size).toBe(40);
expect(idColumn.Edit).toBeInstanceOf(Function);

// Test for custID column
const custIDColumn = columns.find((column) => column.accessorKey === "custID");
expect(custIDColumn).toBeDefined();
expect(custIDColumn.header).toBe("Cust Id");
expect(custIDColumn.muiEditTextFieldProps.required).toBe(true);
expect(custIDColumn.muiEditTextFieldProps.variant).toBe("outlined");
expect(custIDColumn.muiEditTextFieldProps.error).toBe(false);
expect(custIDColumn.muiEditTextFieldProps.helperText).toBe(undefined);
expect(custIDColumn.muiEditTextFieldProps.onChange).toBeInstanceOf(Function);

// ... existing code ...

// Add this at the end of your test
expect(result.current).toEqual(
  expect.arrayContaining([
    expect.objectContaining({
      accessorKey: "id",
      header: "Id",
      enableEditing: false,
      size: 40,
      Edit: expect.any(Function),
    }),
    // ... add similar checks for other columns ...
  ])
);

describe("DatePicker", () => {
  it("updates the value when a new date is selected", () => {
    const row = { _valuesCache: {} };
    const column = { id: "date", columnDef: { header: "Date" } };
    const initialValue = moment().format("MM/DD/YYYY");

    const { getByLabelText } = render(
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          onChange={(newValue) => {
            row._valuesCache[column.id] = moment(newValue).format("MM/DD/YYYY");
          }}
          label={column.columnDef.header}
          value={initialValue}
          slotProps={{ textField: { size: "small" } }}
        />
      </LocalizationProvider>
    );

    const newDate = moment().add(1, "days").format("MM/DD/YYYY");
    fireEvent.change(getByLabelText(column.columnDef.header), {
      target: { value: newDate },
    });

    expect(row._valuesCache[column.id]).toBe(newDate);
  });
});
