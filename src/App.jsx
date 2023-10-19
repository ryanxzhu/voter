import './App.css';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import Button from './components/Button';
import TextInput from './components/TextInput';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { RxCross1 } from 'react-icons/rx';
import { FaRegThumbsUp } from 'react-icons/fa';
import { FaThumbsUp } from 'react-icons/fa';

function App() {
    // const [searchParams, setSearchParams] = useSearchParams({ options: '' });
    const [options, setOptions] = useState('');
    // const onChange = (e) =>
    //     setSearchParams(
    //         (prev) => {
    //             prev.set('options', e.target.value);
    //             return prev;
    //         },
    //         { replace: true }
    //     );

    const onChange = (e) => setOptions(e.target.value);

    // const optionsLabel = searchParams.get('options');
    return (
        <div className="m-6 text-gray-600">
            <div className="flex items-center justify-end">
                <Button>
                    <BsArrowCounterclockwise className="text-2xl mr-2" />
                    Votes
                </Button>
                <Button>
                    <BsArrowCounterclockwise className="text-2xl mr-2" />
                    Options
                </Button>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Button>
                        <RxCross1 className="text-xl" />
                    </Button>
                    <TextInput onChange={onChange}>{options}</TextInput>
                </div>
                <div className="flex items-center">
                    <Button>
                        <FaRegThumbsUp />
                    </Button>
                    <Button>
                        <FaRegThumbsUp className="rotate-180" />
                    </Button>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Button>
                        <RxCross1 className="text-xl" />
                    </Button>
                    <TextInput onChange={onChange}>{options}</TextInput>
                </div>
                <div className="flex items-center">
                    <Button>
                        <FaRegThumbsUp />
                    </Button>
                    <Button>
                        <FaRegThumbsUp className="rotate-180" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default App;
