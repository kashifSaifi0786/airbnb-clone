'use client';

import { SafeReservation, SafeUser } from "@/types";
import Container from "../Container";
import ListingCard from "../ListingCard";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Heading from "../Heading";

interface ReservationsProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

const Reservations: React.FC<ReservationsProps> = ({ reservations, currentUser }) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservation Cancelled')
                router.refresh();
            })
            .catch(err => {
                toast.error('Something went wrong')
            })
            .finally(() => {
                setDeletingId('');
            })
    }, [router])


    return (<Container>
        <Heading
            title="Reservations"
            subtitle="Bookings on your properties"
        />
        <div
            className="
        mt-10
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
        "
        >
            {
                reservations.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        currentUser={currentUser}
                        actionId={reservation.id}
                        actionLabel="Cancel Reservation"
                        onAction={onCancel}
                        disabled={reservation.id === deletingId}
                    />
                ))
            }
        </div>
    </Container>);
}

export default Reservations;