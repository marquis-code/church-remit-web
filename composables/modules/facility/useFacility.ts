import { ref } from "vue"
import { facility_mgt_api, type Facility, type Asset, type FacilityBooking } from "@/api_factory/modules/facility"

export const useFacility = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const facilities = ref<Facility[]>([])

  const createFacility = async (branchId: string, facilityData: Facility) => {
    loading.value = true
    error.value = null

    try {
      const response = await facility_mgt_api.$_create_facility(branchId, facilityData)
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to create facility"
      throw err
    } finally {
      loading.value = false
    }
  }

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

  const createAsset = async (facilityId: string, assetData: Asset) => {
    loading.value = true
    error.value = null

    try {
      const response = await facility_mgt_api.$_create_asset(facilityId, assetData)
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to create asset"
      throw err
    } finally {
      loading.value = false
    }
  }

  const bookFacility = async (facilityId: string, bookingData: FacilityBooking) => {
    loading.value = true
    error.value = null

    try {
      const response = await facility_mgt_api.$_book_facility(facilityId, bookingData)
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
    facilities,
    createFacility,
    getFacilities,
    createAsset,
    bookFacility,
  }
}
