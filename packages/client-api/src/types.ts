export type ICourierClientBasicParams = {
  clientKey: string;
  userId: string;
  userSignature?: string;
  apiUrl?: string;
};

export type ICourierClientJWTParams = {
  authorization: string;
  apiUrl?: string;
};
