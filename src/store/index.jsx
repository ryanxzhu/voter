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
import { votesReducer, setShowResults } from './slices/votesSlice';

const store = configureStore({
    reducer: {
        options: optionsReducer,
        votes: votesReducer,
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
    setShowResults,
};
