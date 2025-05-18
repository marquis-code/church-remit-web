import { ref } from "vue"
import { event_mgt_api, type Event } from "@/api_factory/modules/event"

export const useCreateEvent = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)
  const eventData = ref<any>(null)

  const createEvent = async (branchId: string, event: Event) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await event_mgt_api.$_create_event(branchId, event)
      success.value = true
      eventData.value = response.data.data
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to create event"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    eventData,
    createEvent,
  }
}
