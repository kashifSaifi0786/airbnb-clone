'use client';

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
    title,
    subtitle,
    value,
    onChange
}) => {

    const onAdd = useCallback(() => {
        onChange(value + 1)
    }, [value, onChange])

    const onReduce = useCallback(() => {
        if (value === 1) return;

        onChange(value - 1)
    }, [value, onChange])

    return (<div
        className="flex items-center justify-between"
    >
        <div className="flex flex-col">
            <div className="font-bold">{title}</div>
            <div className="font-light text-gray-600">{subtitle}</div>
        </div>

        <div className="flex items-center gap-2">
            <div
                onClick={onReduce}
                className="
            w-10
            h-10
            flex
            items-center
            justify-center
            rounded-full
            border
            border-neutral-400
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
            "
            >
                <AiOutlineMinus />
            </div>
            <div
                className="
            font-light
            text-neutral-600
            text-xl
            "
            >
                {value}
            </div>
            <div
                onClick={onAdd}
                className="
            w-10
            h-10
            flex
            items-center
            justify-center
            rounded-full
            border
            border-neutral-400
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
            "
            >
                <AiOutlinePlus />
            </div>

        </div>
    </div>);
}

export default Counter;