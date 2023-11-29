import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import store from '../src/store/index';
import { createAsyncThunk } from '@reduxjs/toolkit';
import DashboardScreen from '../src/DashboardScreen';

import * as mockSlice from '../src/store/features/authSlice';
import * as mockService from '../src/services/openaiService';
import { mockLogout } from '../src/services/logoutService';

// Mocking the fetchOpenAiData function
const spyFetchOpenAiData = jest.spyOn(mockService, 'fetchOpenAiData').mockImplementation(jest.fn(() => Promise.resolve('Mocked OpenAI Data')));


const spyLogoutAsync = jest.spyOn(mockSlice, 'logoutAsync').mockImplementation(createAsyncThunk('auth/logout', async () => {
    await mockLogout();
    return null;
}));

describe('DashboardScreen', () => {

    it('DashboardScreen components render correctly', () => {

        const { getByTestId } = render(
            <Provider store={store}>
                <DashboardScreen navigation={{ navigate: jest.fn() }} />
            </Provider>
        );

        // Check if the required components are rendered
        expect(getByTestId('dashboard-screen-test-id')).toBeTruthy();
        expect(getByTestId('input-container-test-id')).toBeTruthy();
        expect(getByTestId('input-content-test-id')).toBeTruthy();
        expect(getByTestId('submit-button-test-id')).toBeTruthy();
        expect(getByTestId('logout-button-test-id')).toBeTruthy();
    });

    it('renders the DashboardScreen component and handles submission', async () => {
        // Arrange
        const { getByTestId } = render(
            <Provider store={store}>
                <DashboardScreen navigation={{ navigate: jest.fn() }} />
            </Provider>
        );

        // Act
        // Get the input and submit button by test IDs
        const input = getByTestId('input-content-test-id');
        const submitButton = getByTestId('submit-button-test-id');

        // Type something in the input
        fireEvent.changeText(input, 'Test Message');

        // Click the submit button
        fireEvent.press(submitButton);

        // Assert
        // Check if loading indicator is displayed
        await waitFor(() => {
            expect(spyFetchOpenAiData).toHaveBeenCalled();
        });

    });

    it('renders the DashboardScreen component and handles logout', async () => {
        // Arrange
        const { getByTestId } = render(
            <Provider store={store}>
                <DashboardScreen navigation={{ navigate: jest.fn() }} />
            </Provider>
        );

        // Act
        // Get the logout button by test ID
        const logoutButton = getByTestId('logout-button-test-id');

        // Click the logout button
        fireEvent.press(logoutButton);

        // Assert
        // Wait for the asynchronous action to complete
        await waitFor(() => {
            expect(spyLogoutAsync).toHaveBeenCalled();
        });
    });
});
