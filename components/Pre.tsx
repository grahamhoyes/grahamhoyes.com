"use client";

import { useState, useRef, ReactNode } from "react";
import {
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";

export const Pre = ({ children }: { children: ReactNode }) => {
  const textInput = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const onEnter = () => {
    setHovered(true);
  };
  const onExit = () => {
    setHovered(false);
  };
  const onCopy = () => {
    const content = textInput.current?.textContent ?? null;

    if (content === null) return;

    setCopied(true);

    navigator.clipboard
      .writeText(content)
      .then(() => setTimeout(() => setCopied(false), 2000));
  };

  return (
    <div
      ref={textInput}
      onMouseEnter={onEnter}
      onMouseLeave={onExit}
      className="relative"
    >
      {(hovered || copied) && (
        <button
          aria-label="Copy code"
          type="button"
          className="absolute right-2 top-2 h-8 w-8 rounded p-1 transition hover:bg-light-700 dark:hover:bg-dark-900"
          onClick={onCopy}
        >
          {copied ? (
            <ClipboardDocumentCheckIcon className="text-green-500" />
          ) : (
            <ClipboardDocumentIcon className="text-gray-300" />
          )}
        </button>
      )}

      <pre className="font-mono text-base">{children}</pre>
    </div>
  );
};

export default Pre;
