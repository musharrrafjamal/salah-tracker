// redux/slices/loginDialogSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginDialogState } from "@/redux/types";

const initialState: LoginDialogState = {
  isOpen: false,
};

const loginDialogSlice = createSlice({
  name: "loginDialog",
  initialState,
  reducers: {
    handleChangeLoginDialog(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    openLoginDialog(state) {
      state.isOpen = true;
    },
    closeLoginDialog(state) {
      state.isOpen = false;
    },
  },
});

export const { handleChangeLoginDialog, openLoginDialog, closeLoginDialog } =
  loginDialogSlice.actions;
export default loginDialogSlice.reducer;
