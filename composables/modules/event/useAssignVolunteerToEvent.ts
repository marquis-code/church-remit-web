import { ref } from "vue"
import { event_mgt_api, type VolunteerAssignment } from "@/api_factory/modules/event"

export const useAssignVolunteerToEvent = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  const assignVolunteerToEvent = async (eventId: string, assignment: VolunteerAssignment) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await event_mgt_api.$_assign_volunteer_to_event(eventId, assignment)
      success.value = true
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
    success,
    assignVolunteerToEvent,
  }
}
