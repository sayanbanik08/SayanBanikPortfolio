import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Theme {
  type: string;
  color: string;
}

const AvailableThemes: Theme[] = [{
  type: 'light',
  color: '#0690d4'
}, {
  type: 'dark',
  color: '#111'
}];

interface ThemeStore {
  themes: Theme[];
  theme: Theme;
  nextTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      themes: [...AvailableThemes],
      theme: AvailableThemes[0],
      nextTheme: () => {
        const themes = get().themes;
        const activeThemeIndex = themes.findIndex(theme => theme.type === get().theme.type);
        const nextThemeIndex = (activeThemeIndex + 1) % themes.length;
        set(() => ({ theme: themes[nextThemeIndex] }));
      },
    }),
    {
      name: "theme-storage",
      version: 2,
      partialize: (state) => ({ theme: state.theme }),
      migrate: (persistedState: unknown) => {
        const state = persistedState as { theme?: Theme };
        // If the persisted theme color doesn't match any current theme, reset to default
        const isValid = AvailableThemes.some(t => t.color === state?.theme?.color);
        if (!isValid) {
          return { theme: AvailableThemes[0] };
        }
        return state;
      },
    }
  )
);