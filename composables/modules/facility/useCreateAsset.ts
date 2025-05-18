import { ref } from "vue"
import { facility_mgt_api, type Asset } from "@/api_factory/modules/facility"

export const useCreateAsset = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)
  const assetData = ref<any>(null)

  const createAsset = async (facilityId: string, asset: Asset) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await facility_mgt_api.$_create_asset(facilityId, asset)
      success.value = true
      assetData.value = response.data.data
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to create asset"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    assetData,
    createAsset,
  }
}
