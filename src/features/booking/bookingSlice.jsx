import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../app/api/axiosInstance";
import ENDPOINTS from "../../app/endpoint";

// Create booking
export const createBooking = createAsyncThunk(
  "booking/create",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axiosInstance.post(ENDPOINTS.BOOKING.CREATE, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.booking;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.msg || err.message || "Booking creation failed"
      );
    }
  }
);

// Get all bookings (admin/worker/customer dashboard)
export const getBookings = createAsyncThunk(
  "booking/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axiosInstance.get(ENDPOINTS.BOOKING.GET_ALL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.bookings;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.msg || err.message || "Fetching bookings failed"
      );
    }
  }
);


export const getCustomerBookings = createAsyncThunk(
  "booking/getCustomerBookings",
  async (customerId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      // Pass the customer ID as a query param or path if needed
      const res = await axiosInstance.get(`${ENDPOINTS.BOOKING.GET_CUSTOMER_BOOKINGS}/${customerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.bookings;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


// Update booking (accept/reject/cancel)
export const updateBooking = createAsyncThunk(
  "booking/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axiosInstance.put(
        `${ENDPOINTS.BOOKING.UPDATE}/${id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data.booking;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.msg || err.message || "Updating booking failed"
      );
    }
  }
);
export const getWorkerBookings = createAsyncThunk(
  "booking/getWorkerBookings",
  async (workerId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      // Pass the worker ID in the URL
      const res = await axiosInstance.get(`${ENDPOINTS.BOOKING.GET_WORKERS_BOOKINGS}/${workerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.bookings;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete booking
export const deleteBooking = createAsyncThunk(
  "booking/delete",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      await axiosInstance.delete(`${ENDPOINTS.BOOKING.DELETE}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.msg || err.message || "Deleting booking failed"
      );
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    currentBooking: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
        state.error = null;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All
      .addCase(getBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
        state.error = null;
      })
      .addCase(getBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Customer Bookings
      .addCase(getCustomerBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCustomerBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
        state.error = null;
      })
      .addCase(getCustomerBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = state.bookings.map((b) =>
          b._id === action.payload._id ? action.payload : b
        );
        if (state.currentBooking?._id === action.payload._id) {
          state.currentBooking = action.payload;
        }
        state.error = null;
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Worker Bookings
      .addCase(getWorkerBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWorkerBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
        state.error = null;
      })
      .addCase(getWorkerBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = state.bookings.filter((b) => b._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingSlice.reducer;
