import {type ComponentProps, useId} from "react";
import Input from "@/components/ui/input";

type TextFieldProps = ComponentProps<'input'> & {
    label: string;
    error?: string;
    hint?: string;
}

const TextField = ({label, error, hint, id, ...props}: TextFieldProps) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const messageId = `${inputId}-message`;
    const message = error ?? hint;

    return (
        <div className="flex w-full flex-col gap-1">
            <label htmlFor={inputId}>{label}</label>
            <Input
                id={inputId}
                aria-invalid={error ? true : undefined}
                aria-describedby={message ? messageId : undefined}
                {...props}
            />
            {message ? (
                <p id={messageId} className={error ? "text-sm text-red-400" : "text-sm text-white/60"}>
                    {message}
                </p>
            ) : null}
        </div>
    );
};

export default TextField;