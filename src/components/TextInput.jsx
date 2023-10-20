import { useDispatch } from 'react-redux';
import { editLabel } from '../store';

function TextInput({ children, id, editable, className }) {
    const dispatch = useDispatch();
    const handleChange = (e) => {
        dispatch(editLabel({ id, value: e.target.value }));
    };
    return (
        <input
            type="text"
            value={children}
            onChange={handleChange}
            className={`outline-none w-full ${className}`}
            readOnly={!editable}
            autoFocus
        />
    );
}

export default TextInput;
