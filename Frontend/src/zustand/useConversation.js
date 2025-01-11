import { create } from "zustand";

const useConversation = create((set) => ({
  // State for selected conversation
  selectedConversation: null,

  // Action to update the selected conversation
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),

  // State for messages
  messages: [],

  // Action to update messages
  setMessage: (messages) => set({ messages }),
}));

export default useConversation;
