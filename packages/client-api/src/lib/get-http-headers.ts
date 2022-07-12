import { ICourierClientBasicParams, ICourierClientJWTParams } from "~/types";

export default (
  params: ICourierClientBasicParams | ICourierClientJWTParams
) => {
  let headers = {};

  if ("authorization" in params) {
    headers = {
      authorization: `Bearer ${params.authorization}`,
    };
  } else {
    const { clientKey, userId, userSignature } = params;

    headers = {
      "x-courier-client-key": clientKey,
      "x-courier-user-id": userId,
    };

    if (userSignature) {
      headers["x-courier-user-signature"] = userSignature;
    }
  }

  return headers;
};
