import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: localStorage.getItem('token') || null,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const token = action.payload;
      localStorage.setItem('token', token);
      state.user = token;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { login, logout, setIsLoading } = authSlice.actions;
export default authSlice.reducer;
