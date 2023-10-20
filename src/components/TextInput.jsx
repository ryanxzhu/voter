import { useDispatch } from 'react-redux';
import { editLabel } from '../store';
import { useRef, useEffect } from 'react';

function TextInput({ children, id, editable, className }) {
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);
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
            ref={inputRef}
        />
    );
}

export default TextInput;
