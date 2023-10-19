import './App.css';
import { useSearchParams } from 'react-router-dom';
import OptionList from './components/OptionList';
import Button from './components/Button';
import { SlRefresh } from 'react-icons/sl';

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
        <div className="m-2 text-gray-700">
            <div className="flex items-center justify-end">
                <Button>
                    <SlRefresh className="text-xl mr-2" />
                    Votes
                </Button>
                <Button>
                    <SlRefresh className="text-xl mr-2" />
                    Options
                </Button>
            </div>
            <OptionList />
        </div>
    );
}

export default App;
