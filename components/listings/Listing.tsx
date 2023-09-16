'use client'
import { SafeListing, SafeReservation, SafeUser } from "@/types";
import Container from "../Container";
import Heading from "../Heading";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import { categories } from "../Navbar/Categories";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Reservation } from "@prisma/client";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import useLoginModel from "@/hooks/useLoginModel";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "./ListingReservation";
import { Range } from "react-date-range";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingProps {
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
}

const Listing: React.FC<ListingProps> = ({
    listing,
    currentUser,
    reservations = []
}) => {
    const router = useRouter();
    const loginModel = useLoginModel()

    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const category = useMemo(() => {
        return categories.find(item => item.label === listing.category)
    }, [listing.category])

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                end: new Date(reservation.endDate),
                start: new Date(reservation.startDate)
            })

            dates = [...dates, ...range]
        })

        return dates;
    }, [reservations]);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModel.onOpen();
        }

        setLoading(true);
        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing.id
        }).then(() => {
            toast.success('Booking reserved.')
            setDateRange(initialDateRange);
            router.push('/trips')
        }).catch(() => {
            toast.error('Something went wrong.')
        }).finally(() => {
            setLoading(false)
        })

    }, [
        totalPrice,
        dateRange,
        listing.id,
        currentUser,
        loginModel,
        router
    ])

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            console.log('start', dateRange.startDate.toISOString())
            console.log('end', dateRange.endDate.toISOString())
            const dayCount = differenceInDays(
                dateRange.endDate,
                dateRange.startDate,
            );
            console.log(dayCount)
            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price)
            } else {
                setTotalPrice(listing.price)
            }
        }
    }, [dateRange, listing.price])

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        id={listing.id}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        currentUser={currentUser}
                    />
                    <div
                        className="
                        grid
                        grid-cols-1
                        md:grid-cols-7
                        md:gap-10
                        mt-6
                        "
                    >
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            guestsCount={listing.guestCount}
                            roomCount={listing.roomCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                        <div
                            className="
                        order-first
                        mb-10
                        md:order-last
                        md:col-span-3
                        "
                        >
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                dateRenge={dateRange}
                                onChangeDate={(value) => setDateRange(value)}
                                onSubmit={onCreateReservation}
                                disabled={loading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Listing;