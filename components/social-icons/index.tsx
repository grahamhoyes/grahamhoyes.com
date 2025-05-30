import Mail from "./mail.svg";
import Github from "./github.svg";
import Linkedin from "./linkedin.svg";

// Icons taken from: https://simpleicons.org/

const components = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
};

interface SocialIconProps {
  kind: string;
  href: string;
  size?: number;
}

const SocialIcon = ({ kind, href, size = 8 }: SocialIconProps) => {
  if (
    !href ||
    (kind === "mail" &&
      !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href))
  )
    return null;

  const SocialSvg = components[kind];

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-light-700 hover:text-blue-500 dark:text-dark-200 dark:hover:text-blue-400 h-${size} w-${size} transition-colors`}
      />
    </a>
  );
};

export default SocialIcon;
