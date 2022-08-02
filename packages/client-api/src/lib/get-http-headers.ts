import { ICourierClientBasicParams, ICourierClientJWTParams } from "~/types";
import packageJson from "~/../package.json";

export default (
  params: ICourierClientBasicParams | ICourierClientJWTParams
) => {
  let headers = {};

  if ("authorization" in params) {
    headers = {
      authorization: `Bearer ${params.authorization}`,
      "x-courier-client-version": packageJson.version,
      "x-courier-client-platform": "nodejs",
    };
  } else {
    const { clientKey, userId, userSignature } = params;

    headers = {
      "x-courier-client-key": clientKey,
      "x-courier-user-id": userId,
      "x-courier-client-version": packageJson.version,
      "x-courier-client-platform": "nodejs",
    };

    if (userSignature) {
      headers["x-courier-user-signature"] = userSignature;
    }
  }

  return headers;
};
