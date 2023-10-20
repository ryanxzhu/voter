import TextInput from './TextInput';
import Button from './Button';
import { RxCross1 } from 'react-icons/rx';
import { FaRegThumbsUp } from 'react-icons/fa6';
import { FaThumbsUp } from 'react-icons/fa6';
import { removeOption, upvoteAction, downvoteAction } from '../store';
import { useDispatch } from 'react-redux';

function Option({ option, editable, showResults, maxScore }) {
    const dispatch = useDispatch();
    const handleRemoveOption = (id) => {
        dispatch(removeOption(id));
    };

    const handleUpVote = (id) => {
        dispatch(upvoteAction(id));
    };

    const handleDownVote = (id) => {
        dispatch(downvoteAction(id));
    };

    let width = Math.round(100 * (option.score / maxScore));
    width = width >= 0 ? width : 0;
    console.log(width);

    const thumbs = (
        <div className="flex items-center">
            <Button onClick={() => handleUpVote(option.id)}>
                {option.upvote ? <FaThumbsUp /> : <FaRegThumbsUp />}
            </Button>
            <Button onClick={() => handleDownVote(option.id)}>
                {option.downvote ? (
                    <FaThumbsUp className="rotate-180" />
                ) : (
                    <FaRegThumbsUp className="rotate-180" />
                )}
            </Button>
        </div>
    );

    const bar = (
        <div className="flex items-center">
            <div className="mr-3">{option.score}</div>
            <div className="w-[100px] h-10 flex justify-end">
                <div className={`border h-6 my-2 bg-slate-700 rounded w-[${width}px]`}></div>
            </div>
        </div>
    );

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                {editable && (
                    <Button className="absolute" onClick={() => handleRemoveOption(option.id)}>
                        <RxCross1 />
                    </Button>
                )}

                <TextInput className="ml-12" id={option.id} editable={editable}>
                    {option.label}
                </TextInput>
            </div>
            {showResults ? bar : thumbs}
        </div>
    );
}

export default Option;
