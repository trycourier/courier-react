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

export const getTimeAgoShort = (created: string) => {
  const timeAgo = getTimeAgo(created);

  return timeAgo
    .replace(" year ago", "y")
    .replace(" years ago", "y")
    .replace(" month ago", "mo")
    .replace(" months ago", "mo")
    .replace(" day ago", "d")
    .replace(" days ago", "d")
    .replace(" hour ago", "h")
    .replace(" hours ago", "h")
    .replace(" minute ago", "m")
    .replace(" minutes ago", "m")
    .replace(" second ago", "s")
    .replace(" seconds ago", "s");
};
