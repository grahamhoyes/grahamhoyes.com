import siteMetadata from "@/data/siteMetadata";

const formatDate = (date: string | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(siteMetadata.locale, options);
};

export default formatDate;
