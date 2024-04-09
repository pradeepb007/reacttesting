import { render, fireEvent } from "@testing-library/react";
import ToggleButtons from "./ToggleButtons";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

jest.mock("@material-ui/lab/ToggleButton", () => jest.fn(() => null));
jest.mock("@material-ui/lab/ToggleButtonGroup", () => jest.fn(() => null));

describe("ToggleButtons", () => {
  beforeEach(() => {
    ToggleButton.mockClear();
    ToggleButtonGroup.mockClear();
  });

  it("should render with initial state", () => {
    render(<ToggleButtons />);

    expect(ToggleButtonGroup).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "left",
        color: "primary",
      }),
      {}
    );
  });

  it("should update state when approve button is clicked", () => {
    const { getByLabelText } = render(<ToggleButtons />);

    fireEvent.click(getByLabelText("approve"));

    expect(ToggleButtonGroup).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "approve",
        color: "success",
      }),
      {}
    );
  });

  it("should update state when reject button is clicked", () => {
    const { getByLabelText } = render(<ToggleButtons />);

    fireEvent.click(getByLabelText("reject"));

    expect(ToggleButtonGroup).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "reject",
        color: "error",
      }),
      {}
    );
  });
});

import { render, fireEvent } from "@testing-library/react";
import ToggleButtons from "./ToggleButtons";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

describe("ToggleButtons", () => {
  it("should render with initial state", () => {
    const { getByLabelText } = render(<ToggleButtons />);

    const approveButton = getByLabelText("approve");
    const rejectButton = getByLabelText("reject");

    expect(approveButton).toBeInTheDocument();
    expect(rejectButton).toBeInTheDocument();
  });

  it("should update state when approve button is clicked", () => {
    const { getByLabelText } = render(<ToggleButtons />);

    const approveButton = getByLabelText("approve");
    fireEvent.click(approveButton);

    expect(approveButton).toHaveAttribute("aria-pressed", "true");
    expect(approveButton).toHaveAttribute("color", "success");
  });

  it("should update state when reject button is clicked", () => {
    const { getByLabelText } = render(<ToggleButtons />);

    const rejectButton = getByLabelText("reject");
    fireEvent.click(rejectButton);

    expect(rejectButton).toHaveAttribute("aria-pressed", "true");
    expect(rejectButton).toHaveAttribute("color", "error");
  });
});

import { render, fireEvent } from "@testing-library/react";
import Example from "./Example";
import { MaterialReactTable } from "material-react-table";

jest.mock("material-react-table", () => ({
  MaterialReactTable: jest.fn(() => null),
  useMaterialReactTable: jest.fn(() => ({})),
}));

describe("Example", () => {
  beforeEach(() => {
    MaterialReactTable.mockClear();
  });

  it("should render MaterialReactTable with correct props", () => {
    render(<Example />);

    expect(MaterialReactTable).toHaveBeenCalledWith(
      expect.objectContaining({
        columns: expect.any(Function),
        data: expect.arrayContaining([
          expect.objectContaining({ product: "product 1" }),
          expect.objectContaining({ product: "product 2" }),
        ]),
        enableEditing: false,
        enableRowActions: true,
        enableColumnActions: false,
        manualPagination: true,
        initialState: expect.objectContaining({
          density: "compact",
          showGlobalFilter: true,
          columnPinning: expect.objectContaining({
            right: ["mrt-row-actions"],
          }),
        }),
        renderRowActions: expect.any(Function),
      }),
      {}
    );
  });
});
