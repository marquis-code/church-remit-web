import { GATEWAY_ENDPOINT } from '../axios.config'

// Type Definitions

export type Notification = {
  id: string
  title: string
  message: string
  read: boolean
  timestamp: string
  type?: string
}

export const notification_mgt_api = {
    $_get_user_notifications: async (userId: string) => {
      const url = `/notifications?isRead=false`
      return axios.get(url)
    },
  
    $_mark_notification_as_read: async (notificationId: string) => {
      const url = `/notifications/${notificationId}/read`
      return axios.put(url)
    },
  
    $_mark_all_notifications_as_read: async (userId: string) => {
      const url = `/notifications/user/${userId}/read-all`
      return axios.put(url)
    }
  }
  