'use client'

import { SafeUser } from "@/types";
import Heading from "../Heading";
import useCountries from "@/hooks/useCountries";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
    title: string;
    imageSrc: string;
    id: string;
    locationValue: string;
    currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    id,
    imageSrc,
    locationValue,
    currentUser
}) => {
    const { getByValue } = useCountries();
    const location = getByValue(locationValue);


    return (<>
        <Heading
            title={title}
            subtitle={`${location?.region} ${location?.label}`}
        />
        <div
            className="
            w-full
            h-[60vh]
            relative
            rounded-xl
            overflow-hidden
            "
        >
            <Image
                src={imageSrc}
                alt="image"
                fill
                className="object-cover w-full
            "
            />

            <div
                className="absolute top-5 right-5"
            >
                <HeartButton
                    listingId={id}
                    currentUser={currentUser}
                />
            </div>

        </div>
    </>);
}

export default ListingHead;