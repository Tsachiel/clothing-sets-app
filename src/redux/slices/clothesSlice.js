import { createSlice } from "@reduxjs/toolkit";
import { CLOTHES_API } from "../../utils/consts";

const initialState = {
  data: {
    shoes: [],
    pants: [],
    shirts: [],
  },
  loading: false,
  error: null,
};

const clothesSlice = createSlice({
  name: "clothes",
  initialState,
  reducers: {
    fetchClothesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchClothesSuccess(state, action) {
      const { clothes } = action.payload;
      state.loading = false;
      state.error = null;
      state.data.shoes = clothes.filter(item => item.type === "shoes");
      state.data.pants = clothes.filter(item => item.type === "pants");
      state.data.shirts = clothes.filter(item => item.type === "shirt");
    },
    fetchClothesError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchClothesStart,
  fetchClothesSuccess,
  fetchClothesError,
} = clothesSlice.actions;

export default clothesSlice.reducer;

export const fetchClothes = () => async (dispatch) => {
  dispatch(fetchClothesStart());
  try {
    const res = await fetch(CLOTHES_API);
    const clothes = await res.json();
    console.log(clothes);
    
    dispatch(fetchClothesSuccess({ clothes }));
  } catch (e) {
    dispatch(fetchClothesError(e.message));
  }
};
