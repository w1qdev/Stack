interface OwnProps {
    className?: string;
    id?: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e) => void;
}

const Input = ({
    className,
    id,
    type,
    placeholder,
    value,
    onChange,
}: OwnProps) => {
    return (
        <input
            className={`w-[100%] rounded-[6px] bg-transparent border-[1px] border-[#FFFFFF]/[0.36] outline-none py-[8px] px-[16px] transition duration-300 placeholder:text-[#FFFFFF]/[0.33] focus:border-[#ffffff] ${className}`}
            type={type}
            placeholder={placeholder}
            id={id}
            value={value}
            onChange={onChange}
        />
    );
};

export default Input;
