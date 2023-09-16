'use client'

import { SafeListing, SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

import Container from "../Container";
import Heading from "../Heading";
import ListingCard from "../ListingCard";

interface PropertiesProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}

const Properties: React.FC<PropertiesProps> = ({
    listings,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');


    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
            .then(() => {
                toast.success('Property deleted')
                router.refresh();
            }).catch((err) => {
                toast.error(err?.response?.data?.error || 'Something went wrong');
            }).finally(() => {
                setDeletingId('');
            })

    }, [router])

    return (<Container>

        <Heading
            title="Properties"
            subtitle="List of your properties"
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
            {listings.map((listing) => (
                <ListingCard
                    key={listing.id}
                    data={listing}
                    currentUser={currentUser}
                    actionId={listing.id}
                    actionLabel="Delete Property"
                    onAction={onCancel}
                    disabled={deletingId === listing.id}
                />
            ))}

        </div>
    </Container>);
}

export default Properties;