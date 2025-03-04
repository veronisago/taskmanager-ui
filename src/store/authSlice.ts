import { createSlice } from '@reduxjs/toolkit';

// Definir la estructura del estado de autenticación
type AuthState = {
    user: { id: string; name: string; email: string } | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
};


const initialState: AuthState = {
    user: null,
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
        },
        setUser: (state, { payload }) => {
            state.user = payload;
        },
        setIsAuthenticated: (state, { payload }) => {
            state.isAuthenticated = payload;
        },
        setLoading: (state, { payload }) => {
            state.loading = payload;
        },
    }
});

export const { logout, setUser, setIsAuthenticated, setLoading } = authSlice.actions;
export default authSlice.reducer;
