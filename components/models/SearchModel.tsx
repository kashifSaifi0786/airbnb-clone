'use client'
import useSearchModel from "@/hooks/useSearchModel";
import Model from "./Model";
import Calender from "../inputs/Calender";
import Counter from "../inputs/Counter";
import Heading from "../Heading";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";

import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from 'next/navigation'
import { Range } from "react-date-range";
import qs from 'query-string';
import { formatISO } from "date-fns";

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModel = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModel = useSearchModel();

    const [steps, setSteps] = useState(STEPS.LOCATION);

    const [location, setLocation] = useState<CountrySelectValue>();
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    })

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location])

    const onNext = useCallback(() => {
        setSteps(value => value + 1);
    }, [])

    const onBack = useCallback(() => {
        setSteps(value => value - 1);
    }, [])


    const onSubmit = useCallback(() => {
        if (steps !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount,
        }

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true })

        setSteps(STEPS.LOCATION);
        searchModel.onClose();
        router.push(url);
    }, [
        steps,
        onNext,
        guestCount,
        roomCount,
        bathroomCount,
        router,
        params,
        searchModel,
        location,
        dateRange
    ])

    const actionLabel = useMemo(() => {
        if (steps === STEPS.INFO) {
            return 'Search'
        }

        return 'Next'
    }, [steps])

    const secondaryActionLabel = useMemo(() => {
        if (steps === STEPS.LOCATION) {
            return undefined;
        }

        return 'Back'
    }, [steps])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Where do you wanna go?"
                subtitle="Find the perfect location!"
            />
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )

    if (steps === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="When do you plan to go?"
                    subtitle="Make sure everyone is free!"
                />
                <Calender
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        )
    }

    if (steps === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="More Information"
                    subtitle="Find your perfect place!"
                />
                <Counter
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}
                    title="Guests"
                    subtitle="How many guests are you coming?"
                />
                <Counter
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}
                    title="Rooms"
                    subtitle="How many rooms do you need?"
                />
                <Counter
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}
                    title="Bathrooms"
                    subtitle="How many bathrooms do you need?"
                />
            </div>
        )
    }

    return (<Model
        title="Filters"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={steps === STEPS.LOCATION ? undefined : onBack}
        isOpen={searchModel.isOpen}
        onClose={searchModel.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
    />);
}

export default SearchModel;