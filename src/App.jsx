import './App.css';
import { useSearchParams } from 'react-router-dom';
import OptionList from './components/OptionList';
import Button from './components/Button';
import { BsArrowCounterclockwise } from 'react-icons/bs';

function App() {
    // const [searchParams, setSearchParams] = useSearchParams({ options: '' });
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
        <div className="m-6 text-gray-700 text-sm">
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
            <OptionList />
        </div>
    );
}

export default App;
