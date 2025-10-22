import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
    popularProducts: [],
    newProducts: [],
    saleItems: [],
    topUsers: [],
};

const HomePageSlice = createSlice({
    name: "homePage",
    initialState,
    reducers: {
        setPopularProducts: (state, action) => {
            state.popularProducts = action.payload;
        },
        setNewProducts: (state, action) => {
            state.newProducts = action.payload;
        },
        setSaleItems: (state, action) => {
            state.saleItems = action.payload;
        },
        setTopUsers: (state, action) => {
            state.topUsers = action.payload;
        },
    },
});


export const { setPopularProducts, setSaleItems, setNewProducts, setTopUsers } =
    HomePageSlice.actions;

const HomePageReducer = HomePageSlice.reducer;
export default HomePageReducer;