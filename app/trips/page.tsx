import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import Trips from "@/components/trips/Trips";

const Page = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return <EmptyState
            title="Unauthorized"
            subtitle="Please login"
        />
    }

    const reservations = await getReservations({ userId: currentUser.id });

    if (reservations.length === 0) {
        return <EmptyState
            title="No trips found"
            subtitle="Looks like you haven't reserved any trip."
        />
    }

    return (<Trips
        reservations={reservations}
        currentUser={currentUser}
    />);
}

export default Page;