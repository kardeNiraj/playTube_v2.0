import { create } from 'zustand'

export const useCategory = create((set) => ({
    category: "New",
    changeCategory: (ctg) => set(state => ({category: ctg})),
    resetCategory: () => set(state => ({category: "New"})),
}))