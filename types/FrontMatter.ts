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
  href: string;
}
