import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../api/user";
import { AppDispatch } from "../store";
import { getUserInfoApi } from "../../api/user";
import { RootState } from "../store";

export type TGetEmployeeInfoState = {
    employee: IUser | null;
    isLoading: boolean;
    hasError: boolean;
  };


const initialState:TGetEmployeeInfoState = {
    employee: null,
    isLoading: false,
    hasError: false
}


export const fetchEmployee = createAsyncThunk('employee/fetchUser', async (id:number) => {
    const responce = await getUserInfoApi(id);
    return responce
})



export const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(fetchEmployee.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        });
        builder.addCase(fetchEmployee.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.hasError = false;
            state.employee = action.payload;
       });
        builder.addCase(fetchEmployee.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        });
    },
});

//export const { userFetching, userFetchingSuccess, userFetchingError } = userSlice.actions;

export const selectEmployee= (state:RootState) => state.employee;

export default employeeSlice.reducer;