import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./Slices/AuthSlice";
import ticketSliceReducer from "./Slices/TicketSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    tickets: ticketSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export default store;
