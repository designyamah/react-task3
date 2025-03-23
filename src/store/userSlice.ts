import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// User interface
export interface User {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// State interface
interface UserState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentUser: User | null;
}

// Initial state
const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
  currentUser: null,
};

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
});

// User slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Add a new user
    addUser: (state, action: PayloadAction<Omit<User, "id">>) => {
      const newId =
        state.users.length > 0
          ? Math.max(...state.users.map((user) => user.id)) + 1
          : 1;

      state.users.push({
        ...action.payload,
        id: newId,
      });
    },

    // Update an existing user
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },

    // Delete a user
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },

    // Set current user (for editing)
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

// Export actions and reducer
export const { addUser, updateUser, deleteUser, setCurrentUser } =
  userSlice.actions;
export default userSlice.reducer;
