import { ref } from "vue"
import { notification_mgt_api } from "@/api_factory/modules/notification"

export const useMarkAllNotificationsAsRead = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const markAllNotificationsAsRead = async (userId: string) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await notification_mgt_api.$_mark_all_notifications_as_read(userId)
      success.value = true
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
    success,
    markAllNotificationsAsRead,
  }
}
