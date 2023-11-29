import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockAuthenticate } from '../../services/loginService';
import { mockLogout } from '../../services/logoutService';

export const loginAsync = createAsyncThunk<void, object>('auth/login', async ({ username, password }: any) => {
  const response = await mockAuthenticate(username, password);
  return response;
});

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  await mockLogout();
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.token = null;
        state.status = 'idle';
        state.error = null;
      });
  },
});

export default authSlice.reducer;