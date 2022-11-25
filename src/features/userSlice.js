import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  token: localStorage.getItem('token'),
};

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      if (action.payload.rememberMe) localStorage.setItem('token', action.payload.token);
    },
    logoutUser: (state, action) => {
      state.token = '';
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
