function Button({ children, onClick, className }) {
    return (
        <button className={`flex items-center px-4 py-3 ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
