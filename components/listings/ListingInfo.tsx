'use client';
import { SafeUser } from "@/types";
import Avatar from "../Avatar";
import { IconType } from "react-icons";
import ListingCategory from "./ListingCategory";
import useCountries from "@/hooks/useCountries";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('../Map'), {
    ssr: false
})

interface ListingInfoProps {
    user: SafeUser;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined;
    description: string;
    guestsCount: number;
    roomCount: number;
    bathroomCount: number;
    locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    category,
    description,
    guestsCount,
    roomCount,
    bathroomCount,
    locationValue
}) => {
    const { getByValue } = useCountries();
    const coordinates = getByValue(locationValue)?.latlng;

    return (<div className="col-span-4 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
            <div className="
            text-xl
            font-semibold
            flex 
            items-center
            gap-2
            ">
                <div>Hosted by {user.name}</div>
                <Avatar src={user.image} />
            </div>
            <div
                className="
            flex
            items-center
            gap-4
            text-neutral-500
            font-light
            "
            >
                <div>{guestsCount} Guests</div>
                <div>{roomCount} Rooms</div>
                <div>{bathroomCount} Bathrooms</div>
            </div>
        </div>
        <hr />
        {category && (
            <ListingCategory
                icon={category.icon}
                label={category?.label}
                description={category?.description}
            />
        )}
        <hr />
        <div className="text-lg font-light text-neutral-500">
            {description}
        </div>
        <hr />
        <Map
            center={coordinates}
        />
    </div>);
}

export default ListingInfo;