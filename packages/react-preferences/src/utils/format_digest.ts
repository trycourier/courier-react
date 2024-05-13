import { DigestSchedule, RepeatOn } from "@trycourier/react-provider";
import format from "date-fns/format";

export const toUpperCaseFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const formatDigest = (schedule: DigestSchedule) => {
  if (schedule.period === "Instant") return "Instant";
  else if (!schedule.start) {
    if (!schedule.period) {
      return "";
    }
    return toUpperCaseFirstLetter(schedule.period) + " UTC";
  }
  const formatted = getScheduleString(schedule);
  return toUpperCaseFirstLetter(formatted);
};

const getScheduleString = (schedule: DigestSchedule) => {
  if (schedule?.recurrence === "custom") {
    let scheduleString = `Every ${schedule?.repeat?.frequency} ${schedule?.repeat?.interval}(s)`;
    switch (schedule?.repeat?.interval) {
      case "week":
        scheduleString += ` on ${getWeekdaysRepeatOnString(
          schedule?.repeat?.on as RepeatOn
        )}`;
        break;
      case "month":
        scheduleString += ` on ${schedule?.repeat?.on} of the month`;
        break;
      default:
        scheduleString += "";
    }

    if (schedule?.end) {
      scheduleString +=
        typeof schedule.end === "number"
          ? ` (${schedule.end} occurrences)`
          : ` (until ${format(new Date(schedule.end), "MM-dd-yyyy")})`;
    }

    return scheduleString;
  }
  if (schedule?.recurrence === "instant") {
    return "Instant";
  }

  return `${schedule?.recurrence} at ${format(
    new Date(schedule?.start),
    "h:mmaaaaa'm'" // lowercase am/pm while date-fns is older than 2.23.0
  )}`;
};

const getWeekdaysRepeatOnString = (repeatOn: RepeatOn) => {
  const weekdays = Object.keys(repeatOn)
    .map((weekday) => {
      if (repeatOn[weekday]) {
        return `${weekday.charAt(0).toUpperCase()}${weekday.substring(1, 3)}`;
      }
    })
    .filter(Boolean) as string[];

  return weekdays.join(", ");
};

export default formatDigest;
