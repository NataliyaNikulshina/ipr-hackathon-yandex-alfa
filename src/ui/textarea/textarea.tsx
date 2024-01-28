import React, { ChangeEvent } from 'react';
import './textarea.scss'
//placeholder={'Введите описание задачи'} height={'172px'};

interface TextareaProps {
    placeholder?: string;
    width?: string;
    height?: string;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({ placeholder, width, height, value, disabled, onChange }) => {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // внутренняя логика компонента
        console.log(e.target.value)
        // + если функция передана пропсом
        if (onChange) {
            onChange(e.target.value);
        }
    };
    return (
        <textarea
            className='textarea'
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            style={{ height: height || '100px', width: width || '100%' }}
            disabled={disabled}
        />
    );
};

export default Textarea;