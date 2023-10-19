import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addOption } from '../store';
import { BsPlusLg } from 'react-icons/bs';
import Button from './Button';
import Option from './Option';

function OptionList() {
    const dispatch = useDispatch();
    const optionList = useSelector((state) => {
        return state.options;
    });
    console.log(optionList);
    const handleAddOption = (label) => {
        const newOption = {
            id: uuidv4(),
            label: label,
            score: 0,
            upvote: false,
            downvote: false,
        };
        dispatch(addOption(newOption));
    };

    const renderedOptions = optionList.map((option) => {
        return <Option key={option.id} option={option} />;
    });
    return (
        <>
            {renderedOptions}

            <Button onClick={() => handleAddOption('')} className="w-full">
                <BsPlusLg className="text mr-4" />
                Add Option
            </Button>
        </>
    );
}

export default OptionList;
