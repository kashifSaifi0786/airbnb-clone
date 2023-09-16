"use client";

import { useCallback, useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModelProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    disabled?: boolean;
    actionLabel: string;
    secondaryActionLabel?: string;
    secondaryAction?: () => void;
}

const Model: React.FC<ModelProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    disabled,
    actionLabel,
    secondaryAction,
    secondaryActionLabel,
}) => {
    const [showModel, setShowModel] = useState(isOpen);

    useEffect(() => {
        setShowModel(isOpen)
    }, [isOpen])

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }

        setShowModel(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose, disabled]);

    const handleSubmit = useCallback(() => {
        if (!disabled) return;

        onSubmit()
    }, [disabled, onSubmit])

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) return;

        secondaryAction()
    }, [disabled, secondaryAction])

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div
                className="
                fixed
                inset-0
                flex
                items-center
                justify-center
                bg-neutral-800/70
                z-50
                outline-none
                focus:outline-none
                overflow-x-hidden
                overflow-y-scroll
                "
            >
                <div
                    className="
                    relative
                    w-full
                    md:w-4/6
                    lg:w-3/6
                    xl:w-2/5
                    my-6
                    h-full
                    md:h-auto
                "
                >
                    {/* CONTENT */}
                    <div
                        className={`
                            translate
                            duration-300
                            ${showModel ? "translate-y-0" : "translate-y-full"}
                            ${showModel ? "opacity-100" : "opacity-0"}
                        `}
                    >
                        <div
                            className="
                            translate
                            h-full
                            md:h-auto
                            bg-white
                            relative
                            w-full
                            border-none
                            rounded-lg
                            shadow-lg
                            flex
                            flex-col
                            outline-none
                            focus:outline-none
                            "
                        >
                            {/* Header */}
                            <div
                                className="
                                flex 
                                justify-center
                                items-center
                                rounded-t
                                relative
                                p-6
                                border-b
                                "
                            >
                                <button
                                    className="
                                    transition
                                    absolute
                                    left-9
                                    hover:opacity-70
                                    p-1
                                    "
                                    onClick={handleClose}
                                >
                                    <IoMdClose size={18} />
                                </button>
                                <div className="
                                    text-lg
                                    font-semibold
                                    "
                                >
                                    {title}
                                </div>
                            </div>
                            {/* body */}
                            <div className="relative p-6 flex-auto">
                                {body}
                            </div>
                            {/* footer */}
                            <div className="flex flex-col gap-2 p-6">
                                <div className="flex gap-4 items-center w-full">
                                    {
                                        secondaryAction && secondaryActionLabel && (
                                            <Button
                                                disabled={disabled}
                                                label={secondaryActionLabel}
                                                onClick={handleSecondaryAction}
                                                outlined
                                            />
                                        )
                                    }
                                    <Button
                                        disabled={disabled}
                                        label={actionLabel}
                                        onClick={onSubmit}
                                    />
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Model;
