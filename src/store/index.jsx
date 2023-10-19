import { configureStore, createSlice } from '@reduxjs/toolkit';

const optionsSlice = createSlice({
    name: 'option',
    initialState: [],
    reducers: {
        addOption(state, action) {
            state.push(action.payload);
        },
        removeOption(state, action) {
            //
        },
        updateVote(state, action) {
            //
        },
        tallyVotes(state, action) {
            //
        },
        nextPerson(state, action) {
            //
        },
        showResults(state, action) {
            //
        },
    },
});

const store = configureStore({
    reducer: {
        options: optionsSlice.reducer,
    },
});

console.log(store);
