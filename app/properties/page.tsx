import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import Properties from "@/components/properties/Properties";

const Page = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return <EmptyState
            title="Unauthorized"
            subtitle="Please login"
        />
    }

    const listings = await getListings({ userId: currentUser.id });

    if (listings.length === 0) {
        return <EmptyState
            title="No properties found"
            subtitle="Looks like you have no properties."
        />
    }

    return (<Properties
        listings={listings}
        currentUser={currentUser}
    />);
}

export default Page;