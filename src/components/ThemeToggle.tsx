import { THEMES, useTheme } from "../contexts/theme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="theme-toggle"
      role="radiogroup"
      aria-label="Theme"
    >
      {THEMES.map((t) => {
        const active = theme === t.id;
        return (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={active}
            className={
              "theme-toggle-option" +
              (active ? " theme-toggle-option-active" : "")
            }
            onClick={() => setTheme(t.id)}
            title={t.description}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

export default ThemeToggle;
