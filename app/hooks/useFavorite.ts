import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import useLoginModal from './useLoginModal';
import { useCallback, useMemo } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface IUseFavorite {
  listingId: string;
  currentUser?: User | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModel = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [listingId, currentUser]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModel.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }
        await request();
        router.refresh();
        toast.success('Success');
      } catch (error) {
        toast.error('Something went wrong');
      }
    },
    [currentUser, loginModel, hasFavorited, listingId, router]
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
