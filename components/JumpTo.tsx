import { ReactNode } from "react";

import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";

interface JumpToProps {
  href: string;
  text?: string;
  children?: ReactNode;
  icon?: ReactNode;
  center?: boolean;
}

export const JumpTo = ({
  href,
  text,
  icon,
  center = true,
  children,
}: JumpToProps) => (
  <div className={`not-prose ${center ? "text-center" : ""}`}>
    <a
      href={href}
      className="inline-flex items-center rounded-full bg-primary-500 px-2 py-1 text-sm font-medium text-light-200 transition-colors hover:bg-primary-600"
    >
      {text || null}
      {children || null}
      {icon ? icon : <ArrowDownCircleIcon className="ml-1 h-6 w-6" />}
    </a>
  </div>
);

export default JumpTo;
