import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IUserMe } from "../../api/user";
import { AppDispatch } from "../store";
import { getUserMeInfoApi } from "../../api/user";
import { RootState } from "../store";

export type TGetUserInfoState = {
    user: IUserMe | null;
    isLoading: boolean;
    hasError: boolean;
  };


const initialState:TGetUserInfoState = {
    user: null,
    isLoading: false,
    hasError: false
}

// export const fetchUser = () => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(userSlice.actions.userFetching())
//         const responce = await getUserInfoApi();
//         dispatch(userSlice.actions.userFetchingSuccess(responce))
//     } catch (e) {
//         dispatch(userSlice.actions.userFetchingError())
//     }
// }

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    const responce = await getUserMeInfoApi();
    return responce
})

// export const fetchUsers = createAsyncThunk(
//     'user',
//     async (_, thunkAPI) => {
//         try {
//             const response = await await getUserInfoApi();
//             return response;
//         } catch (e) {
//             return thunkAPI.rejectWithValue("Не удалось загрузить пользователя")
//         }
//     }
// )

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // userFetching: (state) => {
        //     state.isLoading = true;
        //     state.hasError = false;
        // },
        // userFetchingSuccess: (state, action) => {
        //     state.isLoading = false;
        //     state.hasError = false;
        //     state.user = action.payload;
        // },
        // userFetchingError: (state) => {
        //     state.isLoading = false;
        //     state.hasError = true;
        // },
    },
    extraReducers(builder) {
        builder.addCase(fetchUser.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        });
        builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<IUserMe>) => {
            state.isLoading = false;
            state.hasError = false;
            state.user = action.payload;
       });
        builder.addCase(fetchUser.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        });
    },
});

// export const selectAllUsers = (state) => state.users;

// export const { userFetching, userFetchingSuccess, userFetchingError } = userSlice.actions;

export const selectUser = (state:RootState) => state.user;

export default userSlice.reducer;