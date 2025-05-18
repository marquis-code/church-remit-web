import { ref } from "vue"
import { facility_mgt_api, type Facility } from "@/api_factory/modules/facility"

export const useCreateFacility = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)
  const facilityData = ref<any>(null)

  const createFacility = async (branchId: string, facility: Facility) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await facility_mgt_api.$_create_facility(branchId, facility)
      success.value = true
      facilityData.value = response.data.data
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to create facility"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    facilityData,
    createFacility,
  }
}
