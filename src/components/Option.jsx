import TextInput from './TextInput';
import Button from './Button';
import { RxCross1 } from 'react-icons/rx';
import { FaRegThumbsUp } from 'react-icons/fa6';
import { FaThumbsUp } from 'react-icons/fa6';
import { removeOption, upvoteAction, downvoteAction } from '../store';
import { useDispatch } from 'react-redux';

function Option({ option, editable }) {
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
        </div>
    );
}

export default Option;
