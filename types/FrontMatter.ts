export interface PostFrontMatter {
  title: string;
  date: string;
  tags: string[];
  lastmod?: string;
  draft?: boolean;
  summary?: string;
  images?: string[];
  authors?: string[];
  layout?: string;
  canonicalUrl?: string;
  slug: string;
  fileName: string;
}

export interface AuthorFrontMatter {
  layout?: string;
  name: string;
  avatar: string;
  occupation: string;
  company: string;
  email: string;
  twitter: string;
  linkedin: string;
  github: string;
}

export interface ProjectFrontMatter {
  title: string;
  imgSrc: string;
  // Tailwind object position class to use for the card image. Any
  // object position is actually fine.
  imageAnchor: "object-top" | "object-left-top";
  href: string;
  linkText?: string;
  // Control the order that projects are displayed,
  // lower numbers first. Defaults to 0. Sorted alphabetically
  // by the file system second.
  order?: number;
}
