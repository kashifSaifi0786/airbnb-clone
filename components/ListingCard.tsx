'use client';
import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

import { SafeListing, SafeUser } from "@/types";
import useCountries from "@/hooks/useCountries";
import HeartButton from "./HeartButton";
import { format } from 'date-fns'
import Button from "./Button";

interface ListingCardProps {
    data: SafeListing;
    currentUser?: SafeUser | null;
    reservation?: any;
    disabled?: boolean;
    actionId?: string;
    actionLabel?: string;
    onAction?: (id: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
    currentUser,
    data,
    reservation,
    disabled,
    actionId = '',
    actionLabel,
    onAction
}) => {
    const router = useRouter();
    const { getByValue } = useCountries()

    const location = getByValue(data.locationValue);

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }

            onAction?.(actionId)
        }, [disabled, onAction, actionId]);

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice
        }

        return data.price
    }, [reservation, data.price])

    const reservationDate = useMemo(() => {
        if (!reservation) return null

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    }, [reservation])

    return (<div
        onClick={() => router.push(`/listings/${data.id}`)}
        className="col-span-1 cursor-pointer group">
        <div className="flex flex-col gap-2 w-full">
            <div
                className="
            aspect-square
            w-full
            relative
            overflow-hidden
            rounded-xl
            "
            >
                <Image
                    src={data.imageSrc}
                    fill
                    alt="listing"
                    className="
                    w-full
                    h-full
                    object-cover
                    group-hover:scale-110
                    transition
                    "
                />
                <div className="absolute top-3 right-3">
                    <HeartButton
                        listingId={data.id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
            <div className="font-semibold text-lg">
                {location?.region}, {location?.label}
            </div>
            <div className="font-light text-neutral-500">
                {reservationDate || data.category}
            </div>
            <div className="flex items-center gap-1">
                <div className="font-semibold">$ {price}</div>
                {
                    !reservation && (
                        <div className="font-light">night</div>
                    )
                }
            </div>
            {
                onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        label={actionLabel}
                        onClick={handleCancel}
                        small
                    />
                )
            }
        </div>
    </div>);
}

export default ListingCard;