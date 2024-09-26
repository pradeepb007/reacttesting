import React from 'react'; // Ensure React is imported for hooks
import { renderHook, act } from '@testing-library/react-hooks'; // React hook testing library
import CommentsColumns from './CommentsColumns'; // Adjust to your correct file path

test('displays and handles CloseIcon button click when in edit mode', () => {
  const comments = { 1: 'Test comment' };
  const setComments = jest.fn();

  // Mock useState for editMode and manually manage the state changes.
  const mockSetEditMode = jest.fn();
  const mockUseState = jest.spyOn(React, 'useState');

  // Initial mock state with editMode = false
  let editMode = {};
  mockUseState.mockImplementation(() => [editMode, mockSetEditMode]);

  // Step 1: Render the hook
  const { result, rerender } = renderHook(() => CommentsColumns({ comments, setComments }));

  const columns = result.current;
  const commentColumn = columns.find((col) => col.accessorKey === 'comment');
  const row = { id: 1, comment: 'Test comment' };

  // Step 2: Simulate entering edit mode by updating state to true for row 1
  act(() => {
    editMode = { 1: true };  // Manually change editMode for row 1 to true
    rerender();              // Rerender after the state change
  });

  // Step 3: Fetch the updated props after editMode is set to true
  const editTextFieldProps = commentColumn.muiEditTextFieldProps({ row });

  // Step 4: Assert: CloseIcon should now be visible (non-null)
  expect(editTextFieldProps.InputProps.endAdornment).not.toBeNull();

  // Step 5: Simulate clicking the CloseIcon button
  act(() => {
    const buttonProps = editTextFieldProps.InputProps.endAdornment.props.children.props;
    buttonProps.onClick(); // Simulate CloseIcon click
  });

  // Step 6: Check that the CloseIcon click updates the state to set editMode to false
  expect(mockSetEditMode).toHaveBeenCalledWith({ 1: false });

  // Step 7: Rerender and ensure CloseIcon disappears (editMode is now false)
  act(() => {
    editMode = { 1: false };  // Manually change editMode for row 1 to false
    rerender();
  });

  const updatedEditTextFieldProps = commentColumn.muiEditTextFieldProps({ row });
  expect(updatedEditTextFieldProps.InputProps.endAdornment).toBeNull(); // CloseIcon should be null
});
