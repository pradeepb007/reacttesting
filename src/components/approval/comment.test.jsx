test('displays and handles CloseIcon button click when in edit mode', () => {
  const comments = { 1: 'Test comment' };
  const setComments = jest.fn();

  // Mock useState for editMode to simulate the state changes.
  const mockSetEditMode = jest.fn();
  const mockUseState = jest.spyOn(React, 'useState');
  
  // Mocking initial state of editMode for row 1 to be false initially.
  mockUseState.mockImplementationOnce(() => [{}, mockSetEditMode]);

  const { result } = renderHook(() => CommentsColumns({ comments, setComments }));

  const columns = result.current;
  const commentColumn = columns.find((col) => col.accessorKey === 'comment');

  const row = { id: 1, comment: 'Test comment' };

  // Act: Manually trigger edit mode for this row
  act(() => {
    // Mock setting editMode for row with id 1 to true
    mockSetEditMode({ 1: true });
  });

  // Re-render and get updated editTextFieldProps with editMode set to true
  const editTextFieldProps = commentColumn.muiEditTextFieldProps({ row });

  // Assert: CloseIcon should now be visible (non-null)
  expect(editTextFieldProps.InputProps.endAdornment).not.toBeNull();

  // Act: Simulate clicking the CloseIcon button
  act(() => {
    const buttonProps = editTextFieldProps.InputProps.endAdornment.props.children.props;
    buttonProps.onClick(); // Simulate CloseIcon click
  });

  // Check that the CloseIcon click updates the state (editMode false)
  expect(mockSetEditMode).toHaveBeenCalledWith({ 1: false });

  // Ensure that after clicking, edit mode is disabled and CloseIcon disappears
  const updatedEditTextFieldProps = commentColumn.muiEditTextFieldProps({ row });
  expect(updatedEditTextFieldProps.InputProps.endAdornment).toBeNull();
});
