import { ref } from "vue"
import { notification_mgt_api, type Notification } from "@/api_factory/modules/notification"

export const useNotification = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const notifications = ref<Notification[]>([])

  const getUserNotifications = async (userId: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await notification_mgt_api.$_get_user_notifications(userId)
      notifications.value = response.data.data || []
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch notifications"
      throw err
    } finally {
      loading.value = false
    }
  }

  const markNotificationAsRead = async (notificationId: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await notification_mgt_api.$_mark_notification_as_read(notificationId)
      // Update the local notification state
      const index = notifications.value.findIndex((n) => n.id === notificationId)
      if (index !== -1) {
        notifications.value[index].read = true
      }
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to mark notification as read"
      throw err
    } finally {
      loading.value = false
    }
  }

  const markAllNotificationsAsRead = async (userId: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await notification_mgt_api.$_mark_all_notifications_as_read(userId)
      // Update all notifications to read
      notifications.value = notifications.value.map((n) => ({ ...n, read: true }))
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to mark all notifications as read"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    notifications,
    getUserNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  }
}
