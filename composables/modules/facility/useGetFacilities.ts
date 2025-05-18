import { ref } from "vue"
import { facility_mgt_api, type Facility } from "@/api_factory/modules/facility"

export const useGetFacilities = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const facilities = ref<Facility[]>([])

  const getFacilities = async (branchId: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await facility_mgt_api.$_get_facilities()
      facilities.value = response.data.data || []
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch facilities"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    facilities,
    getFacilities,
  }
}
