import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import PromoGridData from './PromoGridData';

// Mocking Redux store
const mockStore = configureMockStore();
const initialState = {
  promoData: { promoData: [] } // Initial state
};
const store = mockStore(initialState);

describe('PromoGridData Component', () => {
  it('renders without crashing', () => {
    render(<Provider store={store}><PromoGridData /></Provider>);
  });

  it('calls handleCreate when creating a row and saves', async () => {
    // Mock API functions
    const handleCreateMock = jest.fn();
    const addNewRowDataMock = jest.fn(() => Promise.resolve());
    jest.mock('../../api/promoGridApi', () => ({
      ...jest.requireActual('../../api/promoGridApi'),
      addNewRowData: addNewRowDataMock,
    }));

    const { getByText } = render(<Provider store={store}><PromoGridData /></Provider>);

    // Simulate creating row
    fireEvent.click(getByText('Create Row'));

    // Simulate saving created row
    fireEvent.click(getByText('Save'));

    // Ensure handleCreateMock is called
    expect(addNewRowDataMock).toHaveBeenCalled();
  });

  // Add more test cases for other functionalities like editing, deleting, etc.
});