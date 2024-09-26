import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CommentsColumns from './CommentsColumns'; // Adjust the path as per your project structure

test('displays and handles CloseIcon button click when in edit mode', () => {
  const comments = { 1: 'Test comment' };
  const setComments = jest.fn();

  // Step 1: Render the component fully
  render(<CommentsColumns comments={comments} setComments={setComments} />);

  // Step 2: Find the text input for the comment
  const commentInput = screen.getByDisplayValue('Test comment');
  
  // Step 3: Simulate focus event to enter edit mode (this should show CloseIcon)
  fireEvent.focus(commentInput);

  // Step 4: Assert that CloseIcon is now visible
  const closeIconButton = screen.getByTestId('clear-button');
  expect(closeIconButton).toBeInTheDocument();

  // Step 5: Simulate click on CloseIcon (to exit edit mode)
  fireEvent.click(closeIconButton);

  // Step 6: Assert that the CloseIcon is no longer visible after the click
  expect(closeIconButton).not.toBeInTheDocument();
});
