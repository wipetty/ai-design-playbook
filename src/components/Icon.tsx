import type { IconName } from "../data/playbook";

export interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

const PATHS: Record<IconName, JSX.Element> = {
  spark: (
    <>
      <path d="M12 3v6" />
      <path d="M12 15v6" />
      <path d="M3 12h6" />
      <path d="M15 12h6" />
      <path d="M5.6 5.6l4.2 4.2" />
      <path d="M14.2 14.2l4.2 4.2" />
      <path d="M18.4 5.6l-4.2 4.2" />
      <path d="M9.8 14.2l-4.2 4.2" />
    </>
  ),
  bolt: <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" />,
  code: (
    <>
      <path d="M9 7l-5 5 5 5" />
      <path d="M15 7l5 5-5 5" />
      <path d="M14 4l-4 16" />
    </>
  ),
  chat: (
    <>
      <path d="M4 6h16v10H8l-4 4V6z" />
    </>
  ),
  gauge: (
    <>
      <path d="M12 21a9 9 0 1 0-9-9" />
      <path d="M12 12l4-4" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  check: <path d="M5 12l4 4 10-10" />,
  x: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </>
  ),
  loop: (
    <>
      <path d="M21 12a9 9 0 0 1-15 6.7" />
      <path d="M3 12a9 9 0 0 1 15-6.7" />
      <path d="M18 3v4h-4" />
      <path d="M6 21v-4h4" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </>
  ),
  figma: (
    <>
      <path d="M9 3h3v6H9a3 3 0 0 1 0-6z" />
      <path d="M12 3h3a3 3 0 0 1 0 6h-3V3z" />
      <path d="M9 9h3v6H9a3 3 0 0 1 0-6z" />
      <path d="M12 9h3a3 3 0 0 1 0 6 3 3 0 0 1 0-6z" />
      <path d="M9 15h3v3a3 3 0 0 1-3-3z" />
    </>
  ),
  wand: (
    <>
      <path d="M5 19l9-9" />
      <path d="M14 4l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  ruler: (
    <>
      <path d="M3 13l10-10 8 8-10 10-8-8z" />
      <path d="M7 9l1.5 1.5" />
      <path d="M9 7l2 2" />
      <path d="M11 5l1.5 1.5" />
      <path d="M13 11l1.5 1.5" />
      <path d="M15 9l2 2" />
    </>
  ),
  cursor: (
    <>
      <path d="M5 4l5 16 3-7 7-3z" />
      <path d="M14 14l5 5" />
    </>
  ),
  claude: (
    <>
      <path d="M12 4v6" />
      <path d="M12 14v6" />
      <path d="M4 12h6" />
      <path d="M14 12h6" />
      <path d="M6.5 6.5l3.2 3.2" />
      <path d="M14.3 14.3l3.2 3.2" />
      <path d="M17.5 6.5l-3.2 3.2" />
      <path d="M9.7 14.3l-3.2 3.2" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  github: (
    <>
      <path d="M9 19c-3 1-3-1-4-1.5" />
      <path d="M15 21v-3.2c0-1 .1-1.4-.6-2 3-.3 5.6-1.5 5.6-6.4 0-1.4-.5-2.5-1.3-3.4.1-.3.6-1.6-.1-3.3 0 0-1-.3-3.4 1.2a11 11 0 0 0-6 0C6.7 1 5.7 1.3 5.7 1.3c-.7 1.7-.2 3-.1 3.3-.8.9-1.3 2-1.3 3.4 0 4.9 2.7 6 5.6 6.4-.4.3-.7.9-.8 1.7-.7.4-2.6 1-3.7-1 0 0-.7-1.3-2-1.3" />
    </>
  ),
  notion: (
    <>
      <path d="M4 5.5c0-1 .8-1.6 1.8-1.6L17 3a2 2 0 0 1 2.4.5l1.4 1.6c.3.4.2 1 0 1.4l-1 1.7v9.5c0 1-.6 1.7-1.6 1.8l-12 1c-1 .1-1.7-.5-2-1.5l-.7-1.7V5.5z" />
      <path d="M9 8.5l5 6.5V8.5" strokeLinejoin="miter" />
    </>
  ),
  obsidian: (
    <>
      <path d="M12 3l7 5v8l-7 5-7-5V8l7-5z" />
      <path d="M9 9l3 5 3-5" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="M16 10l5-3v10l-5-3z" />
    </>
  ),
  slack: (
    <>
      <rect x="3" y="10" width="6" height="3" rx="1.5" />
      <rect x="11" y="3" width="3" height="6" rx="1.5" />
      <rect x="15" y="11" width="6" height="3" rx="1.5" />
      <rect x="10" y="15" width="3" height="6" rx="1.5" />
    </>
  ),
};

export function Icon({
  name,
  className,
  size = 20,
  strokeWidth = 1.5,
}: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}

export default Icon;
