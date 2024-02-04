import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IIpr } from "../../api/ipr";
import { AppDispatch } from "../store";
import { getIprApi } from "../../api/ipr";
import { RootState } from "../store";

export type TGetIprInfoState = {
    myIpr: IIpr[] | [];
    isLoading: boolean;
    hasError: boolean;
  };

const initialState:TGetIprInfoState = {
    myIpr: [],
    isLoading: false,
    hasError: false
}

export const fetchmyIpr = createAsyncThunk('myIpr/fetch', async (id:number) => {
    const responce = await getIprApi(id);
    return responce
})

export const myIprSlice = createSlice({
    name: 'myIpr',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(fetchmyIpr.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        });
        builder.addCase(fetchmyIpr.fulfilled, (state, action:PayloadAction<IIpr[]>) => {
            state.isLoading = false;
            state.hasError = false;
            state.myIpr = action.payload;
       });
        builder.addCase(fetchmyIpr.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        });
    },
});

export const selectMyIpr = (state:RootState) => state.myIpr;

export default myIprSlice.reducer;