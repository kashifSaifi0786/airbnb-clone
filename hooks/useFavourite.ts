import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";
import { toast } from "react-hot-toast";
import useLoginModel from "./useLoginModel";
import axios from "axios";

interface IUseFavourite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavourite = ({ currentUser, listingId }: IUseFavourite) => {
  const router = useRouter();
  const loginModel = useLoginModel();

  const hasFavourited = useMemo(() => {
    const list = [...(currentUser?.favouriteIds || [])];

    return list.includes(listingId);
  }, [listingId, currentUser]);

  const toggleFavourite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModel.onOpen();
      }

      try {
        let request;

        if (hasFavourited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch (err) {
        toast.error("something went wrong.");
      }
    },
    [hasFavourited, listingId, currentUser, router, loginModel]
  );

  return {
    hasFavourited,
    toggleFavourite,
  };
};

export default useFavourite;
