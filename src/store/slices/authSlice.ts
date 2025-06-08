import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {User} from '../../types/auth';
import {RootState} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@auth_token';
const USER_KEY = '@auth_user';

type AuthState = {
  user: User | null;
  token: string | null;
};

// Acción asíncrona para logout
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      // Limpiar AsyncStorage
      await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
      console.log('🚪 Logout: AsyncStorage cleared');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {user: null, token: null} as AuthState,
  reducers: {
    setCredentials: (
      state,
      {payload: {user, token}}: PayloadAction<{user: User; token: string}>,
    ) => {
      state.user = user;
      state.token = token;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, (state) => {
      // Limpiar el estado del store
      state.user = null;
      state.token = null;
      console.log('🚪 Logout: Store state cleared');
    });
  },
});

export const {setCredentials, clearCredentials} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
