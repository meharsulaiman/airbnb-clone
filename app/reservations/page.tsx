import React from 'react';
import getCurrentUser from '../actions/getCurrentUser';
import EmptyState from '../components/EmptyState';
import getReservations from '../actions/getReservations';
import ReservationClient from './ReservationClient';

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title='Unauthorized'
        subtitle='You must be signed in to view this page.'
      />
    );
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title='No reservation found'
        subtitle='Looks like you have no reservation on your property.'
      />
    );
  }
  return (
    <ReservationClient currentUser={currentUser} reservations={reservations} />
  );
};

export default ReservationPage;
