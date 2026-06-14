import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      apiKey: '',
      setApiKey: (key) => set({ apiKey: key }),
    }),
    {
      name: 'prophoto-storage',
      storage: createJSONStorage(() => localStorage), // or AsyncStorage for mobile
    }
  )
);
