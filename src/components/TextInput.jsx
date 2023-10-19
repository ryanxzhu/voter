function TextInput({ children, onChange }) {
    return <input type="text" value={children} onChange={onChange} />;
}

export default TextInput;
