import useHash from "./use-hash";
import * as uuid from "uuid";
import { useMemo } from "react";

// this hash or clientsoureid is used to help create a managealbe sized property to store information in localstorage
// its possible we will just have the "authorization" as an identifier and that is a huge string

const useClientSourceId = ({
  clientKey,
  userId,
  authorization,
  id,
  localStorage,
}): string => {
  const clientSourceKey = useHash(
    authorization ? authorization : `${clientKey}/${userId}`
  );

  return useMemo(() => {
    if (!localStorage) {
      return;
    }

    const clientSourceIdLSKey = `clientSourceId/${clientSourceKey}`;
    const localStorageClientSourceId =
      localStorage.getItem(clientSourceIdLSKey);

    if (localStorageClientSourceId) {
      return id
        ? `${localStorageClientSourceId}/${id}`
        : localStorageClientSourceId;
    }

    const newClientSourceId = uuid.v4();
    localStorage.setItem(clientSourceIdLSKey, newClientSourceId);
    return id ? `${newClientSourceId}/${id}` : newClientSourceId;
  }, [localStorage, clientSourceKey, id]);
};

export default useClientSourceId;
