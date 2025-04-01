export const dynamic = "force-dynamic";
import React from "react";
import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoritelistings";
import FavoritesClient from "./FavoritesClient";

const FavoritePage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="Aucun favoris trouvé"
        subtitle="Il semble que vous n'avez aucun favoris."
      />
    );
  }
  return <FavoritesClient listings={listings} currentUser={currentUser} />;
};

export default FavoritePage;
