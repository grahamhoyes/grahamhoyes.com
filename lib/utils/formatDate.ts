import siteMetadata from "@/data/siteMetadata";

/**
 * Format a date string or Date object into a human-readable format.
 *
 * Assumes that the provided date is not timezone aware - the date will be printed in UTC.
 * @param date
 */
const formatDate = (date: string | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  return new Date(date).toLocaleDateString(siteMetadata.locale, options);
};

export default formatDate;

/**
 * Format a date string or Date object into an ISO 8601 date string in UTC.
 * @param date
 */
export const isoUtcDate = (date: string | Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  };
  return new Date(date).toLocaleDateString("iso", options);
};

/**
 * Convert a date that is assumed to have been constructed in the given
 * timezone to UTC.
 *
 * This function assumes that the input date is not timezone aware. So while
 * it may be expressed as Date("2025-01-01T00:00:00Z"), we assume that it is
 * actually meant to represent midnight on 2025-01-01 in the given timezone.
 *
 * @param date Date
 * @param timeZone Timezone to treat the date as
 */
export const localToUtcDate = (
  date: string | Date,
  timeZone: string = siteMetadata.timeZone,
): string => {
  const rawDate = new Date(date);

  const localDate = new Date(
    rawDate.getUTCFullYear(),
    rawDate.getUTCMonth(),
    rawDate.getUTCDate(),
    rawDate.getUTCHours(),
    rawDate.getUTCMinutes(),
    rawDate.getUTCSeconds(),
  );

  const timeInTargetZone = new Date(
    localDate.toLocaleString(siteMetadata.locale, { timeZone }),
  );

  const localToTargetOffset = localDate.getTime() - timeInTargetZone.getTime();
  const localToUtcOffset = localDate.getTime() - rawDate.getTime();

  const utcResult = new Date(
    rawDate.getTime() + localToTargetOffset + localToUtcOffset,
  );

  return utcResult.toISOString();
};
