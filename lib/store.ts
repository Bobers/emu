import { create } from 'zustand';
import { User, Strategy } from '@/types';

interface AppStore {
  user: User | null;
  strategies: Strategy[];
  currentStrategy: Strategy | null;
  isLoading: boolean;
  
  setUser: (user: User | null) => void;
  setStrategies: (strategies: Strategy[]) => void;
  setCurrentStrategy: (strategy: Strategy | null) => void;
  setLoading: (loading: boolean) => void;
  addStrategy: (strategy: Strategy) => void;
  updateStrategy: (id: string, updates: Partial<Strategy>) => void;
  deleteStrategy: (id: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  strategies: [],
  currentStrategy: null,
  isLoading: false,

  setUser: (user) => set({ user }),
  
  setStrategies: (strategies) => set({ strategies }),
  
  setCurrentStrategy: (strategy) => set({ currentStrategy: strategy }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  addStrategy: (strategy) => set((state) => ({
    strategies: [...state.strategies, strategy]
  })),
  
  updateStrategy: (id, updates) => set((state) => ({
    strategies: state.strategies.map((s) =>
      s.id === id ? { ...s, ...updates } : s
    ),
    currentStrategy: state.currentStrategy?.id === id
      ? { ...state.currentStrategy, ...updates }
      : state.currentStrategy
  })),
  
  deleteStrategy: (id) => set((state) => ({
    strategies: state.strategies.filter((s) => s.id !== id),
    currentStrategy: state.currentStrategy?.id === id
      ? null
      : state.currentStrategy
  }))
}));