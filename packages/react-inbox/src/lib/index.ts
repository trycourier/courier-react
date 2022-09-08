import distanceInWords from "date-fns/formatDistanceStrict";

export const getTimeAgo = (created: string) => {
  return (
    created &&
    distanceInWords(new Date(created).getTime(), Date.now(), {
      addSuffix: true,
      roundingMethod: "floor",
    })
  );
};
