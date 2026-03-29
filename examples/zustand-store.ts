// Example: Zustand store with Adobe services state
import { create } from 'zustand';

interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: number;
}

interface AppState {
  // Generated images gallery
  generatedImages: GeneratedImage[];
  addImage: (url: string, prompt: string) => void;
  clearImages: () => void;

  // UI state
  isGenerating: boolean;
  setGenerating: (generating: boolean) => void;

  // User preferences
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Image gallery state
  generatedImages: [],
  addImage: (url, prompt) =>
    set((state) => ({
      generatedImages: [
        ...state.generatedImages,
        { url, prompt, timestamp: Date.now() },
      ],
    })),
  clearImages: () => set({ generatedImages: [] }),

  // UI state
  isGenerating: false,
  setGenerating: (generating) => set({ isGenerating: generating }),

  // Preferences
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}));

// Usage example in a component:
//
// import { useAppStore } from './stores/appStore';
//
// function MyComponent() {
//   const images = useAppStore(state => state.generatedImages);
//   const addImage = useAppStore(state => state.addImage);
//   const isGenerating = useAppStore(state => state.isGenerating);
//
//   // Use the state and actions...
// }
