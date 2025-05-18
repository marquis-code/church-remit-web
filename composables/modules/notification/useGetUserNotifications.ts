import { ref } from "vue"
import { notification_mgt_api, type Notification } from "@/api_factory/modules/notification"

export const useGetUserNotifications = () => {
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

  return {
    loading,
    error,
    notifications,
    getUserNotifications,
  }
}
