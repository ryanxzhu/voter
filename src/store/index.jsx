import { configureStore } from '@reduxjs/toolkit';

import {
    optionsReducer,
    addOption,
    removeOption,
    editLabel,
    upvoteAction,
    downvoteAction,
    tallyVotes,
    resetVotes,
    resetOptions,
    init,
} from './slices/optionsSlice';

const store = configureStore({
    reducer: {
        options: optionsReducer,
    },
});

export {
    store,
    addOption,
    removeOption,
    editLabel,
    upvoteAction,
    downvoteAction,
    tallyVotes,
    resetVotes,
    resetOptions,
    init,
};
