import React from "react";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservation";

const ListingPage = async ({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) => {
  const resolvedParams = await params; // Ensure params is resolved before using it
  const listing = await getListingById(resolvedParams);
  const reservations = await getReservations(resolvedParams);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListingClient
      listing={{
        ...listing,
        createdAt: new Date(listing.createdAt),
        user: {
          ...listing.user,
          createdAt: new Date(listing.user.createdAt),
          updatedAt: new Date(listing.user.updatedAt),
          emailVerified: listing.user.emailVerified
            ? new Date(listing.user.emailVerified)
            : null,
        },
      }}
      reservations={reservations.map((reservation) => ({
        ...reservation,
        createdAt: new Date(reservation.createdAt),
        startDate: new Date(reservation.startDate),
        endDate: new Date(reservation.endDate),
      }))}
      currentUser={currentUser}
    />
  );
};

export default ListingPage;
