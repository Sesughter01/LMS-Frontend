
// store/modalSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal(state, action) {
      state.isOpen = action.payload;
    },
  },
});

export const { toggleModal } = modalSlice.actions;
export default modalSlice.reducer;

// store/index.ts
// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './authSlice';


// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     modal: modalReducer,
//   },
// });
