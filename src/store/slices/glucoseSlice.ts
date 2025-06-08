import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { glucoseApi } from '../../services/glucose/glucose';
import { GlucoseData } from '../../types/glucose';

interface GlucoseState {
  data: GlucoseData[];
  loading: boolean;
  error: string | null;
  selectedDate: string;
}

const initialState: GlucoseState = {
  data: [],
  loading: false,
  error: null,
  selectedDate: new Date().toISOString().split('T')[0],
};

export const fetchGlucoseData = createAsyncThunk(
  'glucose/fetchData',
  async ({ userId, date }: { userId: string; date: string }, { rejectWithValue }) => {
    try {
      const response = await glucoseApi.endpoints.getGlucoseData.initiate({ userId, date } );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const glucoseSlice = createSlice({
  name: 'glucose',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlucoseData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGlucoseData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchGlucoseData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedDate, clearError } = glucoseSlice.actions;
export default glucoseSlice.reducer; 