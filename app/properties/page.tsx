export const dynamic = "force-dynamic"; // Forces dynamic rendering for 404
import React from "react";
import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservation";
import TripsClient from "./PropertiesClient";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }
  const listings = await getListings({ userId: currentUser.id });
  if (listings.length === 0) {
    return (
      <EmptyState
        title="Aucune propriété trouvée"
        subtitle="Vous n'avez pas encore de propriétés."
      />
    );
  }
  return (
    <PropertiesClient
      listings={listings}
      currentUser={{
        ...currentUser,
        createdAt: currentUser.createdAt.toISOString(),
        updatedAt: currentUser.updatedAt.toISOString(),
      }}
    />
  );
};

export default PropertiesPage;
