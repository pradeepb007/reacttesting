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
