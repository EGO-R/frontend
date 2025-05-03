import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    user: {
        id: number;
        email: string;
        name: string;
    } | null;
    token: string | null;
}

const initialState: UserState = {
    user: null,
    token: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        clearAuthData: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setAuthData, clearAuthData } = userSlice.actions;
export default userSlice.reducer;
