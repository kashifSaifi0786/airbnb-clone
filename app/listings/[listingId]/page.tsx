import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import EmptyState from "@/components/EmptyState";
import Listing from "@/components/listings/Listing";

interface Params {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: Params }) => {
    const listing = await getListingById(params)
    const currentUser = await getCurrentUser();
    const reservations = await getReservations(params);;

    if (!listing) {
        return <EmptyState />
    }

    return (<Listing
        currentUser={currentUser}
        reservations={reservations}
        listing={listing}
    />);
}

export default ListingPage;