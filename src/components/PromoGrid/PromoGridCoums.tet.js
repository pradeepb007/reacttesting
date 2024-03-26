import { renderHook } from "@testing-library/react-hooks";
import PromoGridColumns from "./PromoGridColumns";

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

    expect(result.current).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          accessorKey: "id",
          header: "Id",
          enableEditing: false,
          size: 40,
          Edit: expect.any(Function),
        },
        {
          accessorKey: "goldenCustID",
          header: "Golden Customer ID",
         muiEditTextFieldProps: {
            required: true,
            variant: "outlined",
            error: expect.any(Boolean),
            helperText: expect.anything,
            onChange: expect.any(Function),
        },
      }
        ),
        // ... add similar checks for other columns ...
      ])
    );

     // Find the columns that use handleChange in their muiEditTextFieldProps.onChange function
     const columnsWithOnChange = columns.filter(column => column.muiEditTextFieldProps && column.muiEditTextFieldProps.onChange);

     // Call the onChange function for each column with some mock data
     columnsWithOnChange.forEach(column => {
       column.muiEditTextFieldProps.onChange({ target: { value: 'test' } });
     });
 
     // Check if handleChange was called for each column
     expect(handleChange).toHaveBeenCalledTimes(columnsWithOnChange.length);
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


import { renderHook } from "@testing-library/react-hooks";
import PromoGridColumns from "./PromoGridColumns";
import { fireEvent, render } from "@testing-library/react";

describe("PromoGridColumns", () => {
  test("returns correct columns", () => {
    // Your existing test for column structure
  });

  const testDatePicker = (column) => {
    test(`renders DatePicker for ${column.accessorKey} column`, () => {
      const validationErrors = {};
      const handleChnage = jest.fn();

      const { result } = renderHook(() =>
        PromoGridColumns(validationErrors, handleChnage)
      );

      const EditComponent = column.Edit;

      // Mock row data
      const row = {
        original: {
          [column.accessorKey]: "2022-01-01", // Default value for date
        },
      };

      const { getByLabelText } = render(<EditComponent row={row} />);

      const datePickerInput = getByLabelText(column.header);
      expect(datePickerInput).toBeInTheDocument();
    });

    test(`updates value on change for ${column.accessorKey} column`, () => {
      const validationErrors = {};
      const handleChnage = jest.fn();

      const { result } = renderHook(() =>
        PromoGridColumns(validationErrors, handleChnage)
      );

      const EditComponent = column.Edit;

      // Mock row data
      const row = {
        original: {
          [column.accessorKey]: "2022-01-01", // Default value for date
        },
        _valuesCache: {},
      };

      const { getByLabelText } = render(<EditComponent row={row} />);

      const datePickerInput = getByLabelText(column.header);

      // Change the date
      fireEvent.change(datePickerInput, { target: { value: "2022-01-15" } });

      expect(row._valuesCache[column.accessorKey]).toBe("2022-01-15");
    });
  };

  // Get columns with DatePicker components
  const { result } = renderHook(() => PromoGridColumns({}, jest.fn()));
  const dateColumns = result.current.filter(
    (column) => column.Edit && column.Edit.toString().includes("DatePicker")
  );

  dateColumns.forEach((column) => {
    testDatePicker(column);
  });
});

import { renderHook } from "@testing-library/react-hooks";
import PromoGridColumns from "./PromoGridColumns";
import { fireEvent } from "@testing-library/react";

describe("PromoGridColumns", () => {
  test("returns correct columns", () => {
    // Your existing test for column structure
  });

  const testRadioButtonChange = (column) => {
    test(`should set value on ${column.accessorKey} radio button change`, () => {
      const validationErrors = {};
      const handleChnage = jest.fn();

      const { result } = renderHook(() =>
        PromoGridColumns(validationErrors, handleChnage)
      );

      const EditComponent = column.Edit;

      // Mock row data
      const row = {
        original: {
          [column.accessorKey]: "female", // Default value for radio buttons
        },
      };

      const { container } = render(<EditComponent row={row} />);

      const femaleRadio = container.querySelector('input[value="female"]');
      const maleRadio = container.querySelector('input[value="male"]');

      expect(femaleRadio).toBeInTheDocument();
      expect(maleRadio).toBeInTheDocument();

      // Click the female radio button
      fireEvent.click(femaleRadio);
      expect(femaleRadio).toBeChecked();

      // Click the male radio button
      fireEvent.click(maleRadio);
      expect(maleRadio).toBeChecked();
    });
  };

  // Get columns with radio button inputs
  const { result } = renderHook(() => PromoGridColumns({}, jest.fn()));
  const radioColumns = result.current.filter(
    (column) => column.Edit && column.Edit.toString().includes("RadioGroup")
  );

  radioColumns.forEach((column) => {
    testRadioButtonChange(column);
  });
});
