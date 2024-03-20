it("calls MRT_EditActionButtons with correct props", () => {
  const tableMock = {};
  const rowMock = {};

  render(<AddEditRow table={tableMock} row={rowMock} />);
  expect(screen.getByText("Edit")).toBeInTheDocument();

  // Log out the props being passed to MRT_EditActionButtons
  console.log(require("material-react-table").MRT_EditActionButtons.mock.calls);

  // Ensure MRT_EditActionButtons was called with correct props
  expect(
    require("material-react-table").MRT_EditActionButtons
  ).toHaveBeenCalledWith(
    expect.objectContaining({
      variant: "text",
      table: tableMock,
      row: rowMock,
    })
  );
});
