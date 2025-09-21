import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../app/api/axiosInstance";
import ENDPOINTS from "../../app/endpoint";

// Login user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, credentials);
      const token = res.data.token;
      localStorage.setItem("token", token);

      // Fetch user after login
      const userRes = await axiosInstance.get(ENDPOINTS.USER.GET_USER, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return userRes.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Login failed");
    }
  }
);

// Register user
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(ENDPOINTS.AUTH.REGISTER, data);
      return res.data; // backend may return message
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || "Registration failed");
    }
  }
);

// Fetch user (on page reload or protected pages)
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axiosInstance.get(ENDPOINTS.USER.GET_USER, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || err.message || "Fetching user failed");
    }
  }
);

export const getWorkers = createAsyncThunk(
  "auth/getWorkers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await axiosInstance.get(ENDPOINTS.USER.GET_WORKERS, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.workers; 
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.msg || err.message || "Fetching workers failed"
      );
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => { state.loading = true; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Register
      .addCase(registerUser.pending, (state) => { state.loading = true; })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch user
      .addCase(fetchUser.pending, (state) => { state.loading = true; })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
