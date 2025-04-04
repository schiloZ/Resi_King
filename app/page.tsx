import { NextPage } from "next";
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
export const dynamic = "force-dynamic"; // Ensures the page is treated as dynamic

interface HomeProps {
  searchParams: Promise<{
    category?: string;
    priceRange?: string;
  }>;
}

const Home: NextPage<HomeProps> = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams; // Ensure searchParams is resolved before using it

  const filters: IListingsParams = {
    category:
      typeof resolvedSearchParams.category === "string"
        ? resolvedSearchParams.category
        : undefined,
  };

  const listings = await getListings(filters);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default Home;
