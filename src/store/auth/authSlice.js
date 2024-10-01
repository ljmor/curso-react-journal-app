import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'checking', 'not-auth', 'auth'
        uid: null,
        email: null,
        displayName: null,
        photoUrl: null,
        errorMessage: null
    },
    reducers: {
        login: (state, { payload }) => {

            state.status = 'auth'; // 'checking', 'not-auth', 'auth'
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoUrl = payload.photoUrl;
            state.errorMessage = null;
        },

        logout: (state, { payload }) => {

            state.status = 'not-auth'; // 'checking', 'not-auth', 'auth'
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoUrl = null;
            state.errorMessage = payload;
        },

        checkCredentials: (state, /* action */) => {

            state.status = 'checking';
        },
    }
});


export const { login, logout, checkCredentials } = authSlice.actions;