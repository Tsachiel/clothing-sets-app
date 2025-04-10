import { createSlice } from "@reduxjs/toolkit";
import { CLOTHES_API } from "../../utils/consts";
import { getInitialSavedSets } from "../../utils/functions";

const initialState = {
  data: {
    shirts: [],
    pants: [],
    shoes: [],
  },
  loading: false,
  error: null,
  currentSet: {
    shirt: null,
    pants: null,
    shoes: null,
  },
  savedSets: [],
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
      state.data.shoes = clothes.filter((item) => item.type === "shoes");
      state.data.pants = clothes.filter((item) => item.type === "pants");
      state.data.shirts = clothes.filter((item) => item.type === "shirt");
    },
    fetchClothesError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    selectItem(state, action) {
      const { type, item } = action.payload;
      state.currentSet[type] = item;
    },
    resetCurrentSet(state) {
      state.currentSet = {
        shirt: null,
        pants: null,
        shoes: null,
      };
    },
    saveCurrentSet(state, action) {
      const { shirt, pants, shoes } = state.currentSet;
      const duration = action.payload?.duration || null;

      const newSet = {
        id: Date.now(),
        shirt,
        pants,
        shoes,
        savedAt: new Date().toISOString(),
        duration,
      };

      state.savedSets.push(newSet);
      localStorage.setItem("savedSets", JSON.stringify(state.savedSets));
    },
    initSavedSets(state) {
      state.savedSets = getInitialSavedSets();
    },
    deleteSet(state, action) {
      const id = action.payload;
      state.savedSets = state.savedSets.filter((set) => set.id !== id);
      localStorage.setItem("savedSets", JSON.stringify(state.savedSets));
    },
  },
});

export const {
  fetchClothesStart,
  fetchClothesSuccess,
  fetchClothesError,
  selectItem,
  resetCurrentSet,
  saveCurrentSet,
  initSavedSets,
  deleteSet,
} = clothesSlice.actions;

export default clothesSlice.reducer;

export const fetchClothes = () => async (dispatch) => {
  dispatch(fetchClothesStart());
  try {
    const res = await fetch(CLOTHES_API);
    const clothes = await res.json();
    dispatch(fetchClothesSuccess({ clothes }));
  } catch (e) {
    dispatch(fetchClothesError(e.message));
  }
};
