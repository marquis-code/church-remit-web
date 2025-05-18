import { ref } from "vue"
import { facility_mgt_api, type FacilityBooking } from "@/api_factory/modules/facility"

export const useBookFacility = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)
  const bookingData = ref<any>(null)

  const bookFacility = async (facilityId: string, booking: FacilityBooking) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await facility_mgt_api.$_book_facility(facilityId, booking)
      success.value = true
      bookingData.value = response.data.data
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to book facility"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    bookingData,
    bookFacility,
  }
}
