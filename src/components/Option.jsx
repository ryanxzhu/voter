import TextInput from './TextInput';
import Button from './Button';
import { RxCross1 } from 'react-icons/rx';
import { FaRegThumbsUp } from 'react-icons/fa';
import { FaThumbsUp } from 'react-icons/fa';

function Option({ option }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <Button>
                    <RxCross1 />
                </Button>
                <TextInput>{option.label}</TextInput>
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
    );
}

export default Option;
