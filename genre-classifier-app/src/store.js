import { configureStore } from "@reduxjs/toolkit";

import modelReducer from "./reducers/modelReducer";

const store = configureStore({
  reducer: {
    model: modelReducer,
  },
});

export default store;
