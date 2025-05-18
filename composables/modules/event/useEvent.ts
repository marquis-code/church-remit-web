import { ref } from "vue"
import { event_mgt_api, type Event, type VolunteerAssignment, type EventQueryParams } from "@/api_factory/modules/event"

export const useEvent = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const events = ref<Event[]>([])

  const createEvent = async (branchId: string, eventData: Event) => {
    loading.value = true
    error.value = null

    try {
      const response = await event_mgt_api.$_create_event(branchId, eventData)
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to create event"
      throw err
    } finally {
      loading.value = false
    }
  }

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

  const assignVolunteerToEvent = async (eventId: string, assignmentData: VolunteerAssignment) => {
    loading.value = true
    error.value = null

    try {
      const response = await event_mgt_api.$_assign_volunteer_to_event(eventId, assignmentData)
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to assign volunteer to event"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    events,
    createEvent,
    getEvents,
    assignVolunteerToEvent,
  }
}
