import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from 'react-router-dom';
import Option from './components/Option';
import Button from './components/Button';
import { BsPlusLg } from 'react-icons/bs';
import { SlRefresh } from 'react-icons/sl';
import { useState, useEffect } from 'react';
import { addOption, tallyVotes, resetVotes, resetOptions } from './store';
import { useDispatch, useSelector } from 'react-redux';

function App() {
    const newOption = {
        id: uuidv4(),
        label: '',
        score: 0,
        upvote: false,
        downvote: false,
    };
    const [editable, setEditable] = useState(true);
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();
    const optionList = useSelector((state) => {
        return state.options;
    });

    useEffect(() => {
        const newOption = {
            id: uuidv4(),
            label: '',
            score: 0,
            upvote: false,
            downvote: false,
        };
        const handler = (e) => {
            if (e.key === 'Enter') {
                dispatch(addOption(newOption));
            }
        };

        document.addEventListener('keydown', handler);
        dispatch(addOption(newOption));
        return () => document.removeEventListener('keydown', handler);
    }, []);

    const handleAddOption = () => {
        dispatch(addOption(newOption));
    };

    const handleTallyVotes = () => {
        dispatch(tallyVotes());
    };

    const handleResetVotes = () => {
        dispatch(resetVotes());
        setCount(0);
        setEditable(true);
    };

    const handleResetOptions = () => {
        dispatch(resetOptions());
        setCount(0);
        setEditable(true);
    };

    const renderedOptions = optionList.map((option) => {
        return <Option key={option.id} option={option} editable={editable} />;
    });

    const renderedVotes = (
        <div className="flex items-center">
            <div className="w-12 h-12 flex items-center justify-center">{count}</div>
            Vote
            {count === 1 ? '' : 's'}
        </div>
    );

    const addOptionBtn = (
        <Button onClick={() => handleAddOption('')} className="w-full">
            <BsPlusLg className="mr-4" />
            Add Option
        </Button>
    );

    // const [searchParams, setSearchParams] = useSearchParams({ options: '' });
    // const onChange = (e) =>
    //     setSearchParams(
    //         (prev) => {
    //             prev.set('options', e.target.value);
    //             return prev;
    //         },
    //         { replace: true }
    //     );

    // const optionsLabel = searchParams.get('options');
    return (
        <div className="m-2 text-gray-700">
            <div className="flex items-center justify-end">
                <Button onClick={() => handleResetVotes()}>
                    <SlRefresh className="text-xl mr-2" />
                    Votes
                </Button>
                <Button
                    onClick={() => {
                        const result = confirm('Are you sure you want to reset all vote options?');
                        result && handleResetOptions();
                    }}
                >
                    <SlRefresh className="text-xl mr-2" />
                    Options
                </Button>
            </div>

            {renderedOptions}

            {editable ? addOptionBtn : renderedVotes}

            <Button
                onClick={() => {
                    handleTallyVotes();
                    setEditable(false);
                    setCount(count + 1);
                }}
                className="justify-center border rounded-lg mx-auto w-24"
            >
                Vote
            </Button>

            <Button
                onClick={() => {
                    handleTallyVotes();
                }}
                className="justify-center border rounded-lg mx-auto w-24 mt-10"
            >
                Results
            </Button>
        </div>
    );
}

export default App;
