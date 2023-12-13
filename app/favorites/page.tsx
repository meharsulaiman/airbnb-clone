import React from 'react';
import EmptyState from '../components/EmptyState';
import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavoriteListings';
import FavoriteClient from './FavoriteClient';
export const dynamic = 'force-dynamic';

export default async function ListingPage() {
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListings();

  if (listings.length === 0) {
    return (
      <EmptyState
        title='No favorites found'
        subtitle='Looks like you have no favorite listings.'
      />
    );
  }

  return <FavoriteClient listings={listings} currentUser={currentUser} />;
}
