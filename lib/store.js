import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCampaignStore = create(
  persist(
    (set, get) => ({
      user: null,
      coordinators: [],
      volunteers: [],
      supporters: [],
      news: [],
      events: [],
      tasks: [],
      reports: [],
      results: [], // New state for Election Results
      messages: [],

      login: (userData) => set({ user: userData }),
      logout: () => set({ user: null }),

      addCoordinator: (coord) =>
        set((state) => ({
          coordinators: [
            ...state.coordinators,
            { ...coord, role: "coordinator", createdAt: new Date() },
          ],
        })),

      addVolunteer: (vol) =>
        set((state) => ({
          volunteers: [
            ...state.volunteers,
            { ...vol, role: "volunteer", createdAt: new Date() },
          ],
        })),

      addSupporter: (sup) =>
        set((state) => ({
          supporters: [
            ...state.supporters,
            { ...sup, role: "supporter", createdAt: new Date() },
          ],
        })),

      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: Date.now(),
              status: "Pending",
              createdAt: new Date(),
            },
          ],
        })),

      // Add/Update these actions in your useCampaignStore:
      // updateTaskStatus: (taskId, newStatus, newDeadline = null) =>
      //   set((state) => ({
      //     tasks: state.tasks.map((t) =>
      //       t.id === taskId
      //         ? { ...t, status: newStatus, deadline: newDeadline || t.deadline }
      //         : t,
      //     ),
      //   })),

      // Ensure this action is exactly like this in your store:
      updateTaskStatus: (taskId, newStatus, newDeadline = null) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            // Convert both to strings to ensure a perfect match
            t.id.toString() === taskId.toString()
              ? { ...t, status: newStatus, deadline: newDeadline || t.deadline }
              : t,
          ),
        })),

      addReport: (report) =>
        set((state) => ({
          reports: [
            ...state.reports,
            {
              ...report,
              id: Date.now(),
              status: "Pending Review",
              createdAt: new Date(),
            },
          ],
        })),

      // CMS ACTIONS - Now handling images and categories
      addNews: (item) => set((state) => ({ news: [item, ...state.news] })),
      deleteNews: (id) =>
        set((state) => ({ news: state.news.filter((n) => n.id !== id) })),

      addEvent: (item) => set((state) => ({ events: [item, ...state.events] })),
      deleteEvent: (id) =>
        set((state) => ({ events: state.events.filter((e) => e.id !== id) })),

      setResults: (data) => set({ results: data }),

      // Add this to your useCampaignStore actions
      setLgaResults: (lgaName, partyData) =>
        set((state) => ({
          results: {
            ...state.results,
            [lgaName]: partyData, // Stores { TO: 5000, OPP1: 2000, OPP2: 1500 }
          },
        })),

      addMessage: (msg) =>
        set((state) => ({
          messages: [
            ...state.messages,
            { ...msg, id: Date.now(), timestamp: new Date().toISOString() },
          ],
        })),
    }),
    { name: "osun-east-campaign-storage" },
  ),
);
