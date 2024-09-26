import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks'; // Hook testing utilities
import CommentsColumns from './CommentsColumns'; // Adjust the path as needed

test('displays and handles CloseIcon button click when in edit mode', () => {
  const comments = { 1: 'Test comment' };
  const setComments = jest.fn();

  // Step 1: Mock useState for editMode
  let editMode = { 1: false };
  const setEditMode = jest.fn((newMode) => {
    editMode = newMode; // Update local variable
  });
  jest.spyOn(React, 'useState').mockImplementationOnce(() => [editMode, setEditMode]);

  // Step 2: Render the hook
  const { result } = renderHook(() => CommentsColumns({ comments, setComments }));

  const columns = result.current;
  const commentColumn = columns.find((col) => col.accessorKey === 'comment');
  const row = { id: 1, comment: 'Test comment' };

  // Step 3: Simulate entering edit mode (editMode = true)
  act(() => {
    setEditMode({ 1: true }); // Manually trigger edit mode for row 1
  });

  // Step 4: Fetch updated muiEditTextFieldProps after editMode = true
  let editTextFieldProps = commentColumn.muiEditTextFieldProps({ row });

  // Step 5: Assert: CloseIcon should now be visible (non-null endAdornment)
  expect(editTextFieldProps.InputProps.endAdornment).not.toBeNull();

  // Step 6: Simulate CloseIcon click
  act(() => {
    const closeButtonProps = editTextFieldProps.InputProps.endAdornment.props.children.props;
    closeButtonProps.onClick(); // Simulate the CloseIcon click event
  });

  // Step 7: Assert: CloseIcon should disappear after click (editMode = false)
  act(() => {
    setEditMode({ 1: false }); // Set editMode back to false
  });
  
  editTextFieldProps = commentColumn.muiEditTextFieldProps({ row });
  expect(editTextFieldProps.InputProps.endAdornment).toBeNull();
});
