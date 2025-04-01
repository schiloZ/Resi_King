export const dynamic = "force-dynamic";
import ReservationsClient from "./ReservationsClient";
import getReservations from "../actions/getReservation";
import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ authorId: currentUser.id });
  if (reservations.length === 0) {
    return (
      <EmptyState
        title="Aucune réservation trouvée"
        subtitle="Vous n'avez aucune réservation"
      />
    );
  }
  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
};

export default ReservationPage;
