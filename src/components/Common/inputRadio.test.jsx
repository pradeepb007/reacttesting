import React from "react";
import { render, fireEvent } from "@testing-library/react";
import InputRadio from "./InputRadio";

describe("InputRadio", () => {
  it("should render with correct label and options", () => {
    const row = {
      original: {},
    };
    const column = {
      columnDef: {
        header: "eventRadio",
      },
      id: "eventRadio",
    };

    const { getByLabelText } = render(<InputRadio row={row} column={column} />);

    // Check if label is rendered correctly
    expect(getByLabelText(column.columnDef.header)).toBeInTheDocument();

    // Check if options are rendered correctly
    expect(getByLabelText("Yes")).toBeInTheDocument();
    expect(getByLabelText("No")).toBeInTheDocument();
  });

  it("should update value on option selection", () => {
    const row = {
      original: {},
    };
    const column = {
      columnDef: {
        header: "eventRadio",
      },
      id: "eventRadio",
    };

    const { getByLabelText } = render(<InputRadio row={row} column={column} />);

    // Select "Yes" option
    fireEvent.click(getByLabelText("Yes"));
    expect(getByLabelText("Yes").checked).toBe(true);
    expect(getByLabelText("No").checked).toBe(false);

    // Select "No" option
    fireEvent.click(getByLabelText("No"));
    expect(getByLabelText("Yes").checked).toBe(false);
    expect(getByLabelText("No").checked).toBe(true);
  });
});
