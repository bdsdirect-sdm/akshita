import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    waves: [],
    isLoading: false,
    error: null,
};

const wavesSlice = createSlice({
    name: 'waves',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setWaveSuccess: (state) => {
            state.isLoading = false;
        },
        setWaveError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});

export const { setLoading, setWaveSuccess, setWaveError } = wavesSlice.actions;

export default wavesSlice.reducer;
