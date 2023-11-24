import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from 'react-router-dom';
import Option from './components/Option';
import Button from './components/Button';
import { BsPlusLg } from 'react-icons/bs';
import { SlRefresh } from 'react-icons/sl';
import { useState, useEffect } from 'react';
import { init, addOption, tallyVotes, resetVotes, resetOptions, setShowResults } from './store';
import { useDispatch, useSelector } from 'react-redux';

function newOption(label = '') {
    return {
        id: uuidv4(),
        label: label,
        score: 0,
        upvote: false,
        downvote: false,
    };
}

function App() {
    const [searchParams, setSearchParams] = useSearchParams({ options: '' });
    const dispatch = useDispatch();

    useEffect(() => {
        const urlOptions = searchParams.get('options');
        if (urlOptions !== '') {
            const initOptions = urlOptions.split('·').map((label) => newOption(label));
            dispatch(init(initOptions));
        }

        const handler = (e) => {
            if (e.key === 'Enter') {
                dispatch(addOption(newOption()));
            }
        };
        document.addEventListener('keydown', handler);

        return () => {
            document.removeEventListener('keydown', handler);
        };
    }, []);

    const optionList = Array.from(
        useSelector((state) => {
            return state.options;
        })
    );

    const votes = useSelector((state) => {
        return state.votes;
    });

    const urlOptions = optionList.map((option) => option.label).join('·');

    useEffect(() => {
        setSearchParams(
            (data) => {
                data.set('options', urlOptions);
                return data;
            },
            { replace: true }
        );
    }, [urlOptions]);

    const handleAddOption = () => {
        dispatch(addOption(newOption()));
    };

    const handleVote = () => {
        dispatch(tallyVotes());
    };

    const handleResetVotes = () => {
        dispatch(resetVotes());
    };

    const handleResetOptions = () => {
        dispatch(resetOptions());
    };

    const handleResults = () => {
        dispatch(setShowResults(true));
    };

    const voteBtnVisible = optionList.length > 1;
    const resultsBtnVisible = votes.voteCount > 1;
    const resetVotesVisible = votes.voteCount > 0;
    const resetOptionsVisible = optionList.length > 2;

    const maxScore = Math.max(...optionList.map((e) => e.score));

    if (votes.showResults) {
        optionList.sort((a, b) => b.score - a.score);
    }

    const renderedOptions = optionList.map((option) => {
        return (
            <Option
                key={option.id}
                option={option}
                editable={votes.editable}
                showResults={votes.showResults}
                maxScore={maxScore}
            />
        );
    });

    const renderedVotes = (
        <div className="flex items-center">
            <div className="w-12 h-12 flex items-center justify-center">{votes.voteCount}</div>
            Vote
            {votes.voteCount === 1 ? '' : 's'}
        </div>
    );

    const addOptionBtn = (
        <Button
            onClick={() => {
                handleAddOption('');
            }}
            className="w-2/3"
        >
            <BsPlusLg className="mr-4" />
            Add Option
        </Button>
    );

    return (
        <div className="relative m-2 text-gray-700 max-w-md md:mx-auto">
            <div className="absolute right-0 flex items-center justify-end">
                {resetVotesVisible && (
                    <Button onClick={() => handleResetVotes()}>
                        <SlRefresh className="text-xl mr-2" />
                        Votes
                    </Button>
                )}
                {resetOptionsVisible > 0 && (
                    <Button
                        onClick={() => {
                            const result = confirm(
                                'Are you sure you want to reset all vote options?'
                            );
                            result && handleResetOptions();
                        }}
                    >
                        <SlRefresh className="text-xl mr-2" />
                        Options
                    </Button>
                )}
            </div>
            <div className="pt-12">{renderedOptions}</div>

            {votes.editable ? addOptionBtn : renderedVotes}

            {voteBtnVisible && (
                <Button
                    onClick={() => handleVote()}
                    className="justify-center border border-slate-700 bg-slate-700 text-white rounded-lg mx-auto w-24 mt-4"
                    disabled={votes.showResults}
                >
                    Vote
                </Button>
            )}

            {resultsBtnVisible && (
                <Button
                    onClick={() => handleResults()}
                    className="justify-center border border-slate-700 rounded-lg mx-auto w-24 mt-8"
                    disabled={votes.showResults}
                >
                    Results
                </Button>
            )}
        </div>
    );
}

export default App;
