import { User } from "@/shared/types/user";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "@/services/api/user";

export const fetchAUserByEmail: any = createAsyncThunk(
  "students/fetchAUserByEmail",
  async (email: string) => {
    const user = await userService.GetUsersByEmail(email);
    return user;
  }
);

const initialState: any = {
  user: {},
  singleUserByEmail: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },

    updateUser: (state, action: PayloadAction<Object | null>) => {
      if (action.payload) {
        state.user = action.payload;
      } else {
        state.user = initialState.registrationForm;
      }
    },

    resetUser: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAUserByEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAUserByEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleUserByEmail = action.payload;
      })
      .addCase(fetchAUserByEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      });
  },
});

export const { setUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
