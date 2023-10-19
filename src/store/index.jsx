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
        editLabel(state, action) {
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

console.log(store.getState());

export { store };

export const { addOption } = optionsSlice.actions;
