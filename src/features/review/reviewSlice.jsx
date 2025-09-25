import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../app/api/axiosInstance';
import ENDPOINTS from '../../app/endpoint';

export const createReview = createAsyncThunk(
  'review/create',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const res = await axiosInstance.post(ENDPOINTS.REVIEW.CREATE, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.review;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || error.message || 'Review creation failed'
      );
    }
  }
);

export const getReviewsByWorker = createAsyncThunk(
  'review/getByWorker',
  async (worker_id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const res = await axiosInstance.get(
        `${ENDPOINTS.REVIEW.GET_REVIEW_BY_WORKER}/${worker_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data.reviews;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || error.message || 'Failed to fetch reviews'
      );
    }
  }
);

export const updateReview = createAsyncThunk(
  'review/update',
  async ({ reviewId, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const res = await axiosInstance.put(
        `${ENDPOINTS.REVIEW.UPDATE_REVIEW}/${reviewId}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data.review;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || error.message || 'Review update failed'
      );
    }
  }
);

export const deleteReview = createAsyncThunk(
  'review/delete',
  async (reviewId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      await axiosInstance.delete(
        `${ENDPOINTS.REVIEW.DELETE_REVIEW}/${reviewId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return reviewId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || error.message || 'Review deletion failed'
      );
    }
  }
);

const initialState = {
  review: null,
  loading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    resetReviewState: (state) => {
      state.review = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.review = action.payload;
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;
