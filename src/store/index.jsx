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
            state.length = 0;
        },
    },
});

const store = configureStore({
    reducer: {
        options: optionsSlice.reducer,
    },
});

store.dispatch({
    type: 'option/addOption',
    payload: {
        id: '4324dsfsd242',
        label: 'Catan',
        score: 2,
        upvote: true,
        downvote: false,
    },
});

store.dispatch({
    type: 'option/addOption',
    payload: {
        id: '432433242',
        label: 'then, later figure out how to add enter',
        score: 0,
        upvote: false,
        downvote: false,
    },
});

const action = optionsSlice.actions.addOption({
    id: '4324242',
    label: 'Lrnak',
    score: -1,
    upvote: false,
    downvote: true,
});

store.dispatch(action);

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
