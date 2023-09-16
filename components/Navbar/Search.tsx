'use client'
import useSearchModel from '@/hooks/useSearchModel';
import { BiSearch } from 'react-icons/bi'
import { useSearchParams } from 'next/navigation'
import useCountries from '@/hooks/useCountries';
import { useMemo } from 'react';
import { differenceInDays } from 'date-fns';

const Search = () => {
    const searchModel = useSearchModel();
    const { getByValue } = useCountries()
    const params = useSearchParams();

    const locationValue = params?.get('locationValue');
    const guestCount = params?.get('guestCount');
    const startDate = params?.get('startDate');
    const endDate = params?.get('endDate');

    const locationLabel = useMemo(() => {
        if (locationValue) {
            return getByValue(locationValue)?.label;
        }

        return 'Anywhere'
    }, [locationValue, getByValue])

    const dateLabel = useMemo(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            let diff = differenceInDays(end, start)

            if (diff === 0) {
                diff = 1;
            }

            return `${diff} days`
        }

        return 'Any Week'
    }, [startDate, endDate])

    const guestLabel = useMemo(() => {
        if (guestCount) {
            return `${guestCount} Guests`
        }

        return 'Add Guests'
    }, [guestCount])

    return <div
        onClick={searchModel.onOpen}
        className="
    py-2
    border
    rounded-full
    w-full
    md:w-auto
    shadow-sm
    hover:shadow-md
    transition
    cursor-pointer
    "
    >
        <div className="
        flex
        items-center 
        justify-between
        "
        >
            <div
                className="
            text-sm
            font-semibold
            px-6
            "
            >
                {locationLabel}
            </div>
            <div
                className="
                hidden
                sm:block
                text-sm
                font-semibold
                px-6
                border-x
                flex-1
            "
            >
                {dateLabel}
            </div>
            <div
                className="
            flex 
            items-center
            gap-3
            text-sm
            text-gray-600
            pl-6
            pr-2
            "
            >
                <div className="hidden sm:block">
                    {guestLabel}
                </div>
                <div className='bg-rose-500 text-white rounded-full p-2'>
                    <BiSearch size={18} />
                </div>
            </div>
        </div>
    </div>;
}

export default Search;