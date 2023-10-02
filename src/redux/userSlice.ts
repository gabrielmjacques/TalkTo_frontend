import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'user',
    initialState: {
        username: null,
        isLogged: false
    },

    reducers: {
        SET_USERNAME: (state, { payload }) => {
            return { ...state, isLogged: true, username: payload };
        },

        LOGOUT: (state) => {
            return { ...state, isLogged: false, username: null };
        }
    }
});

export const { SET_USERNAME, LOGOUT } = slice.actions;

export const selectUser = (state: any) => state.user;

export default slice.reducer;