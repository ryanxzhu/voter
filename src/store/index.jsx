import { configureStore, createSlice } from '@reduxjs/toolkit';

const optionsSlice = createSlice({
    name: 'option',
    initialState: [],
    reducers: {
        addOption(state, action) {
            state.push(action.payload);
        },
        removeOption(state, action) {
            const index = state.map((e) => e.id).indexOf(action.payload);
            state.splice(index, 1);
        },
        editLabel(state, action) {
            const index = state.map((e) => e.id).indexOf(action.payload.id);
            state[index].label = action.payload.value;
        },
        upvoteAction(state, action) {
            const index = state.map((e) => e.id).indexOf(action.payload);
            if (!state[index].upvote) {
                for (let i = 0; i < state.length; i++) {
                    state[i].upvote = false;
                }
            }
            state[index].upvote = !state[index].upvote;
        },
        downvoteAction(state, action) {
            const index = state.map((e) => e.id).indexOf(action.payload);
            if (!state[index].downvote) {
                for (let i = 0; i < state.length; i++) {
                    state[i].downvote = false;
                }
            }
            state[index].downvote = !state[index].downvote;
        },
        tallyVotes(state, action) {
            for (let i = 0; i < state.length; i++) {
                if (state[i].label === '') {
                    state.splice(i, 1);
                    i--;
                    continue;
                }
                if (state[i].upvote) state[i].score++;
                if (state[i].downvote) state[i].score--;
                state[i].upvote = false;
                state[i].downvote = false;
            }
        },
        resetVotes(state, action) {
            for (let i = 0; i < state.length; i++) {
                state[i].score = 0;
                state[i].upvote = false;
                state[i].downvote = false;
            }
        },

        resetOptions(state, action) {
            return [];
        },
    },
});

const store = configureStore({
    reducer: {
        options: optionsSlice.reducer,
    },
});

export { store };

export const {
    addOption,
    removeOption,
    editLabel,
    upvoteAction,
    downvoteAction,
    tallyVotes,
    resetVotes,
    resetOptions,
} = optionsSlice.actions;
