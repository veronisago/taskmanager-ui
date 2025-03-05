import { createSlice } from '@reduxjs/toolkit';


type AuthState = {
    user: { id: string; name: string; email: string } | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
};

const storedUser = localStorage.getItem('user');

const initialState: AuthState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    isAuthenticated: false,
    loading: false,
    error: null,
};
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user');
        },
        setUser: (state, { payload }) => {
            state.user = payload;
            localStorage.setItem('user', JSON.stringify(payload));
        },
        setIsAuthenticated: (state, { payload }) => {
            state.isAuthenticated = payload;
        },
        setLoading: (state, { payload }) => {
            state.loading = payload;
        },
    },
});

export const { logout, setUser, setIsAuthenticated, setLoading } = authSlice.actions;
export default authSlice.reducer;
