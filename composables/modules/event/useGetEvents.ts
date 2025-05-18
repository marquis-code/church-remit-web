import { ref } from "vue"
import { event_mgt_api, type Event, type EventQueryParams } from "@/api_factory/modules/event"

export const useGetEvents = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const events = ref<Event[]>([])

  const getEvents = async (branchId: string, params?: EventQueryParams) => {
    loading.value = true
    error.value = null

    try {
      const response = await event_mgt_api.$_get_events(branchId, params)
      events.value = response.data.data || []
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch events"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    events,
    getEvents,
  }
}
