import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IUsers } from "../../api/user";
import { AppDispatch } from "../store";
import { getUsersAllInfoApi } from "../../api/user";
import { RootState } from "../store";

export type TGetUsersTeamInfoState = {
    usersTeam: IUsers[] | null;
    isLoading: boolean;
    hasError: boolean;
  };


const initialState:TGetUsersTeamInfoState = {
    usersTeam: [],
    isLoading: false,
    hasError: false
}


export const fetchUsers = createAsyncThunk('usersTeam/fetch', async () => {
    const responce = await getUsersAllInfoApi();
    return responce
})



export const usersTeamSlice = createSlice({
    name: 'usersTeam',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(fetchUsers.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.usersTeam = action.payload;
       });
        builder.addCase(fetchUsers.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        });
    },
});

//export const { userFetching, userFetchingSuccess, userFetchingError } = userSlice.actions;

export const selectUsersTeam = (state:RootState) => state.usersTeam;

export default usersTeamSlice.reducer;