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
