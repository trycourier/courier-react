import * as uuid from "uuid";
import { useMemo } from "react";
import jwtDecode from "jwt-decode";

const useClientSourceId = ({
  clientKey,
  userId,
  authorization,
  id,
  localStorage,
}): string => {
  const clientSourceKey = useMemo(() => {
    if (!authorization) {
      return `${clientKey}/${userId}`;
    }

    const decoded = jwtDecode(authorization) as {
      tenant_id: string;
      scope: string;
    };
    const scopeUserId = decoded?.scope
      ?.split(" ")
      ?.find((s) => s.includes("user_id"))
      ?.replace("user_id:", "");

    return `${decoded?.tenant_id}/${scopeUserId}`;
  }, [authorization, clientKey, userId]);

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
