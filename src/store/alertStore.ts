import { create } from 'zustand';
import { getAlerts } from '../services/alerts';

interface AlertState {
  unreadCount: number;
  fetchUnreadCount: () => Promise<void>;
}

export const useAlertStore = create<AlertState>((set) => ({
  unreadCount: 0,
  fetchUnreadCount: async () => {
    try {
      // Asumimos que el endpoint acepta query param ?isRead=false
      const alerts = await getAlerts({ isRead: false });
      set({ unreadCount: alerts.length });
    } catch (error) {
      console.error('Error fetching unread count', error);
    }
  },
}));
