import { create } from 'zustand';

export const useStore = create((set) => ({
  apiKey: '',
  setApiKey: (key: string) => set({ apiKey: key }),
}));