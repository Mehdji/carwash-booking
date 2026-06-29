
import type { InputHTMLAttributes } from "react";


type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
};

const TextField = ({ label, id, ...props }: TextFieldProps) => (
    <div className="space-y-2.5">
        <label htmlFor={id} className="block text-center text-base text-text-gray-seventy">
            {label}
        </label>
        <input
            id={id}
            className="w-full rounded-lg border border-white/10 bg-black-service px-4 py-2.5 text-center text-sm text-white outline-none transition placeholder:text-text-gray-sixtyfive focus:border-blue-text"
            {...props}
        />
    </div>
);

export default TextField