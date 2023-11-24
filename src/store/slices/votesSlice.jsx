import { createSlice } from '@reduxjs/toolkit';
import { tallyVotes, resetVotes, resetOptions } from './optionsSlice';

const votesSlice = createSlice({
    name: 'vote',
    initialState: {
        editable: true,
        showResults: false,
        voteCount: 0,
    },
    reducers: {
        setShowResults(state, action) {
            state.showResults = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(tallyVotes, (state, action) => {
                state.editable = false;
                state.voteCount++;
            })
            .addCase(resetVotes, (state, action) => {
                state.editable = true;
                state.showResults = false;
                state.voteCount = 0;
            })
            .addCase(resetOptions, (state, action) => {
                state.editable = true;
                state.showResults = false;
                state.voteCount = 0;
            });
    },
});

export const { setShowResults } = votesSlice.actions;

export const votesReducer = votesSlice.reducer;
