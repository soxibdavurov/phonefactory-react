// src/stores/slices/compare-slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cogoToast from "cogo-toast";
import { CompareItem } from "../../../lib/types/compare";

type CompareState = {
  compareItems: CompareItem[];
};

const LS_KEY = "compareData";

// LocalStorage helperlari
const readFromLS = (): CompareItem[] => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as CompareItem[]) : [];
  } catch {
    return [];
  }
};

const writeToLS = (items: CompareItem[]) => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  } catch {
    /* yozib bo'lmasa (private mode / quota), jim qolamiz */
  }
};

const initialState: CompareState = {
  compareItems: readFromLS(),
};

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addToCompare: (state, action: PayloadAction<CompareItem>) => {
      const exists = state.compareItems.some(
        (it) => it._id === action.payload._id
      );
      if (exists) {
        cogoToast.info("Already in Compare", { position: "bottom-left" });
        return;
      }
      state.compareItems.push(action.payload);
      writeToLS(state.compareItems);
      cogoToast.success("Added to Compare", { position: "bottom-left" });
    },

    deleteFromCompare: (state, action: PayloadAction<string>) => {
      state.compareItems = state.compareItems.filter(
        (it) => it._id !== action.payload
      );
      writeToLS(state.compareItems);
      cogoToast.error("Removed from Compare", { position: "bottom-left" });
    },

    clearCompare: (state) => {
      state.compareItems = [];
      try {
        localStorage.removeItem(LS_KEY);
      } catch { }
      cogoToast.warn("Compare cleared", { position: "bottom-left" });
    },

    // ixtiyoriy: tashqaridan LS dagini qayta yuklash uchun
    hydrateFromStorage: (state) => {
      state.compareItems = readFromLS();
    },
  },
});

export const {
  addToCompare,
  deleteFromCompare,
  clearCompare,
  hydrateFromStorage,
} = compareSlice.actions;

export default compareSlice.reducer;
