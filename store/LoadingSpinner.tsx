import { create } from 'zustand';

type LoadingStore = {
  isLoading: boolean; // Estado de carga
  startLoading: () => void; // Función para activar el spinner
  stopLoading: () => void; // Función para desactivar el spinner
};

export const useLoadingStore = create<LoadingStore>()((set) => ({
  isLoading: false, // Estado inicial: no hay carga
  startLoading: () => set({ isLoading: true }), // Activar el spinner
  stopLoading: () => set({ isLoading: false }), // Desactivar el spinner
}));