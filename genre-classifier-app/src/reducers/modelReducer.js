import { createSlice } from "@reduxjs/toolkit";

import modelService from "../services/api/model";

const modelSlice = createSlice({
  name: "model",
  initialState: null,
  reducers: {
    setModel: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setModel } = modelSlice.actions;

export const fetchModel = () => async (dispatch) => {
  const model = await modelService.get();
  dispatch(setModel(model));
};

export default modelSlice.reducer;
