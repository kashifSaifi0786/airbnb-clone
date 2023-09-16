'use client'
import React from 'react';
import { IconType } from 'react-icons'
interface ButtonProps {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outlined?: boolean;
    small?: boolean;
    icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outlined,
    small,
    icon: Icon
}) => {
    return (<button
        disabled={disabled}
        onClick={onClick}
        className={`
        relative
    bg-rose-500
    disabled:opacity-70
    disabled:cursor-not-allowed
    w-full
    hover:opacity-80
    transition
    rounded-lg
    ${outlined ? 'bg-white' : 'bg-rose-500'}
    ${outlined ? 'text-black' : 'text-white'}
    ${outlined ? 'border-black' : 'border-rose-500'}
    ${small ? 'py-1' : 'py-3'}
    ${small ? 'font-light' : 'font-semibold'}
    ${small ? 'border' : 'border-2'}
    `}
    >
        {
            Icon && (
                <Icon size={24} className='absolute left-4 top-3' />
            )
        }
        {label}
    </button>);
}

export default Button;