import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from 'react-router-dom';
import Option from './components/Option';
import Button from './components/Button';
import { BsPlusLg } from 'react-icons/bs';
import { SlRefresh } from 'react-icons/sl';
import { useState, useEffect } from 'react';
import { init, addOption, tallyVotes, resetVotes, resetOptions } from './store';
import { useDispatch, useSelector } from 'react-redux';

function App() {
    const [searchParams, setSearchParams] = useSearchParams({ options: '' });
    const [editable, setEditable] = useState(true);
    const [showResults, setShowResults] = useState(false);
    const [voteCount, setVoteCount] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        const urlOptions = searchParams.get('options');
        if (urlOptions !== '') {
            const initOptions = urlOptions.split('·').map((label) => {
                return {
                    id: uuidv4(),
                    label,
                    score: 0,
                    upvote: false,
                    downvote: false,
                };
            });
            dispatch(init(initOptions));
        }
        const handler = (e) => {
            if (e.key === 'Enter') {
                const newOption = {
                    id: uuidv4(),
                    label: '',
                    score: 0,
                    upvote: false,
                    downvote: false,
                };
                dispatch(addOption(newOption));
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
        const newOption = {
            id: uuidv4(),
            label: '',
            score: 0,
            upvote: false,
            downvote: false,
        };
        dispatch(addOption(newOption));
    };

    const handleVote = () => {
        dispatch(tallyVotes());
        setEditable(false);
        setVoteCount(voteCount + 1);
    };

    const handleResetVotes = () => {
        dispatch(resetVotes());
        setVoteCount(0);
        setEditable(true);
        setShowResults(false);
    };

    const handleResetOptions = () => {
        dispatch(resetOptions());
        setVoteCount(0);
        setEditable(true);
        setShowResults(false);
    };

    const handleResults = () => {
        setShowResults(true);
    };

    const voteBtnVisible = optionList.length > 1;
    const resultsBtnVisible = voteCount > 1;
    const resetVotesVisible = voteCount > 0;
    const resetOptionsVisible = optionList.length > 2;

    let maxScore;
    if (showResults) {
        optionList.sort((a, b) => b.score - a.score);
        maxScore = Math.max(...optionList.map((option) => option.score));
    }

    const renderedOptions = optionList.map((option) => {
        return (
            <Option
                key={option.id}
                option={option}
                editable={editable}
                showResults={showResults}
                maxScore={maxScore}
            />
        );
    });

    const renderedVotes = (
        <div className="flex items-center">
            <div className="w-12 h-12 flex items-center justify-center">{voteCount}</div>
            Vote
            {voteCount === 1 ? '' : 's'}
        </div>
    );

    const addOptionBtn = (
        <Button
            onClick={() => {
                handleAddOption('');
            }}
            className="w-full"
        >
            <BsPlusLg className="mr-4" />
            Add Option
        </Button>
    );

    return (
        <div className="relative m-2 text-gray-700">
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

            {editable ? addOptionBtn : renderedVotes}

            {voteBtnVisible && (
                <Button
                    onClick={() => handleVote()}
                    className="justify-center border border-slate-700 bg-slate-700 text-white rounded-lg mx-auto w-24 mt-4"
                >
                    Vote
                </Button>
            )}

            {resultsBtnVisible && (
                <Button
                    onClick={() => handleResults()}
                    className="justify-center border border-slate-700 rounded-lg mx-auto w-24 mt-8"
                >
                    Results
                </Button>
            )}
        </div>
    );
}

export default App;
