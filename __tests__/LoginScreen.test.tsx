import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import store from '../src/store/index';
import { createAsyncThunk } from '@reduxjs/toolkit';

import LoginScreen from '../src/LoginScreen';
import { mockAuthenticate } from '../src/services/loginService';
import * as mockSlice from '../src/store/features/authSlice';


const spyLoginAsync = jest.spyOn(mockSlice, 'loginAsync').mockImplementation(createAsyncThunk<void, object>('auth/login', async ({ username, password }: any) => {
  const response = await mockAuthenticate(username, password);
  return response;
}));



describe('LoginScreen', () => {
  it('LoginScreen components render correctly', () => {
    // Arrange
    const { getByTestId } = render(
      <Provider store={store}>
        <LoginScreen navigation={{ navigate: jest.fn() }} />
      </Provider>
    );

    // Assert
    // Check if the required components are rendered
    expect(getByTestId('login-screen')).toBeTruthy();
    expect(getByTestId('app-name-test-id')).toBeTruthy();
    expect(getByTestId('username-input-test-id')).toBeTruthy();
    expect(getByTestId('password-input-test-id')).toBeTruthy();
    expect(getByTestId('login-button-test-id')).toBeTruthy();
  });
  it('<Username is required.> renders correctly', () => {
    // Arrange
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <LoginScreen navigation={{ navigate: jest.fn() }} />
      </Provider>
    );

    // Act
    fireEvent.changeText(getByTestId('password-input-test-id'), 'testpassword');
    // Triggering the login button press
    fireEvent.press(getByTestId('login-button-test-id'));

    // Assert
    // Check if the required components are rendered
    expect(getByText('Username is required.')).toBeTruthy();
  });
  it('<Password is required.> renders correctly', () => {
    // Arrange
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <LoginScreen navigation={{ navigate: jest.fn() }} />
      </Provider>
    );

    // Act
    fireEvent.changeText(getByTestId('username-input-test-id'), 'testuser');
    // Triggering the login button press
    fireEvent.press(getByTestId('login-button-test-id'));

    // Assert
    // Check if the required components are rendered
    expect(getByText('Password is required.')).toBeTruthy();
  });
  it('failed login attempts, <Invalid credentials> renders correctly', async () => {
    // Arrange
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <LoginScreen navigation={{ navigate: jest.fn() }} />
      </Provider>
    );

    // Act
    fireEvent.changeText(getByTestId('username-input-test-id'), 'wrongUser');
    fireEvent.changeText(getByTestId('password-input-test-id'), 'wrongPassword');
    // Triggering the login button press
    fireEvent.press(getByTestId('login-button-test-id'));

    // Wait for 2s because react needs time to render
    let timeout = null;
    await act(async () => { await new Promise((r) => { timeout = setTimeout(r, 2000) }) });

    // Assert
    expect(getByText('Invalid credentials')).toBeTruthy();

  });

  it('handles login correctly', async () => {
    // Arrange
    const { getByTestId } = render(
      <Provider store={store}>
        <LoginScreen navigation={{ navigate: jest.fn() }} />
      </Provider>
    );

    // Act
    // Mocking user input
    fireEvent.changeText(getByTestId('username-input-test-id'), 'testuser');
    fireEvent.changeText(getByTestId('password-input-test-id'), 'testpassword');


    // Triggering the login button press
    fireEvent.press(getByTestId('login-button-test-id'));

    // Assert
    // Wait for the asynchronous action to complete
    await waitFor(() => {
      expect(spyLoginAsync).toHaveBeenCalled();
    });
  });
});
