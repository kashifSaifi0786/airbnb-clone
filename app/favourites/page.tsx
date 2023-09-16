import getFavourites from "../actions/getFavourites";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "@/components/EmptyState";
import Favourites from "@/components/favourites/Favourites";

const Page = async () => {
    const currentUser = await getCurrentUser()
    const favourites = await getFavourites();

    if (favourites.length === 0) {
        return <EmptyState
            title="No Favourites found"
            subtitle="Looks like you have no favourite listings."
        />
    }

    return (
        <Favourites
            listings={favourites}
            currentUser={currentUser}
        />
    );
}

export default Page;