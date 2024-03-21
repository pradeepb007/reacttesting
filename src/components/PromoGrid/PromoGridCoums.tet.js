import { renderHook } from "@testing-library/react-hooks";
import PromoGridColumns from "./PromoGridColumns";

describe("PromoGridColumns", () => {
  test("returns correct columns", () => {
    const validationErrors = {};
    const handleChnage = jest.fn();

    const { result } = renderHook(() =>
      PromoGridColumns(validationErrors, handleChnage)
    );

    expect(result.current).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          accessorKey: "id",
          header: "Id",
          enableEditing: false,
          size: 40,
          Edit: expect.any(Function),
        }),
        expect.objectContaining({
          accessorKey: "custID",
          header: "Cust Id",
          muiEditTextFieldProps: {
            required: true,
            variant: "outlined",
            error: expect.any(Boolean),
            helperText: expect.anything(),
            onChange: expect.any(Function),
          },
        }),
        // ... other columns
        expect.objectContaining({
          accessorKey: "createdBy",
          header: "Created By",
          Edit: expect.any(Function),
        }),
        expect.objectContaining({
          accessorKey: "createdDate",
          header: "Created Date",
          Edit: expect.any(Function),
        }),
        expect.objectContaining({
          accessorKey: "modifiedBy",
          header: "Modified By",
          Edit: expect.any(Function),
        }),
        expect.objectContaining({
          accessorKey: "modifiedDate",
          header: "Modified Date",
          Edit: expect.any(Function),
        }),
      ])
    );
  });
});
