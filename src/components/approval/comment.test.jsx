test('displays and handles CloseIcon button click when in edit mode', () => {
  const comments = { 1: 'Test comment' };
  const setComments = jest.fn();
  const { result } = renderHook(() => CommentsColumns({ comments, setComments }));

  const columns = result.current;
  const commentColumn = columns.find((col) => col.accessorKey === 'comment');

  const row = { id: 1, comment: 'Test comment' };

  // Act: Enter edit mode
  act(() => {
    const editTextFieldProps = commentColumn.muiEditTextFieldProps({ row });
    editTextFieldProps.onFocus(); // Simulate entering edit mode
  });

  // Assert: CloseIcon should be visible in edit mode
  let editTextFieldProps = commentColumn.muiEditTextFieldProps({ row });
  expect(editTextFieldProps.InputProps.endAdornment).not.toBeNull();

  // Act: Simulate clicking the CloseIcon button
  act(() => {
    const buttonProps = editTextFieldProps.InputProps.endAdornment.props.children.props;
    buttonProps.onClick(); // Simulate CloseIcon click
  });

  // Assert: Edit mode should be false after clicking the CloseIcon
  editTextFieldProps = commentColumn.muiEditTextFieldProps({ row });
  expect(editTextFieldProps.InputProps.endAdornment).toBeNull(); // No CloseIcon when not in edit mode
});