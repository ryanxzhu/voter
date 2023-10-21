function Button({ children, onClick, disabled = false, className }) {
    return (
        <button
            className={`flex items-center px-4 py-3 disabled:opacity-60 ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;
