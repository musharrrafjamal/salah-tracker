import { configureStore } from "@reduxjs/toolkit";
import loginDialogReducer from "./slices/loginDialog";

const store = configureStore({
  reducer: {
    loginDialog: loginDialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
