import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IIpr } from "../../api/ipr";
import { AppDispatch } from "../store";
import { getIprApi } from "../../api/ipr";
import { RootState } from "../store";

export type TGetIprInfoState = {
    ipr: IIpr[] | [];
    isLoading: boolean;
    hasError: boolean;
  };

const initialState:TGetIprInfoState = {
    ipr: [],
    isLoading: false,
    hasError: false
}

export const fetchIpr = createAsyncThunk('ipr/fetch', async (id:number) => {
    const responce = await getIprApi(id);
    return responce
})

export const iprSlice = createSlice({
    name: 'ipr',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(fetchIpr.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        });
        builder.addCase(fetchIpr.fulfilled, (state, action:PayloadAction<IIpr[]>) => {
            state.isLoading = false;
            state.hasError = false;
            state.ipr = action.payload;
       });
        builder.addCase(fetchIpr.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        });
    },
});

export const selectIpr = (state:RootState) => state.ipr;

export default iprSlice.reducer;