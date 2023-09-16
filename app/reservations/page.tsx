import Reservations from "@/components/reservations/Reservations";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import EmptyState from "@/components/EmptyState";

const Page = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return <EmptyState
            title="Unauthorized"
            subtitle="Please login"
        />
    }

    const reservations = await getReservations({ authorId: currentUser.id });

    if (reservations.length === 0) {
        return <EmptyState
            title="No reservation found."
            subtitle="Looks like you have no reservations on your properties."
        />
    }

    return (<Reservations
        reservations={reservations}
        currentUser={currentUser}
    />);
}

export default Page;