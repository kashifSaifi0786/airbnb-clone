import Container from "@/components/Container"
import getListings, { IListingParams } from "./actions/getListings"
import getCurrentUser from "./actions/getCurrentUser";
import ListingCard from "@/components/ListingCard";
import EmptyState from "@/components/EmptyState";

interface HomeProps {
  searchParams: IListingParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const curretUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />
  }

  return (
    <Container>
      <div
        className="
      pt-24
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
          listings.map(listing => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={curretUser}
            />
          ))
        }
      </div>
    </Container>
  )
}

export default Home;
