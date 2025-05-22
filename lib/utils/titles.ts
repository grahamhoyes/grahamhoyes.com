import slugify from "slugify";

export const titleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const createSlug = (text: string): string => {
  return slugify(text, { lower: true, strict: true, trim: true });
};

export const createSlugMap = (text: string[]): Map<string, string> => {
  const slugMap = new Map<string, string>();
  text.forEach((t) => {
    slugMap.set(createSlug(t), t);
  });
  return slugMap;
};
