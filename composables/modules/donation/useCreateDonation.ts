import { ref } from "vue"
import { donation_mgt_api, type Donation } from "@/api_factory/modules/donation"

export const useCreateDonation = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)
  const donationData = ref<any>(null)

  const createDonation = async (branchId: string, donation: Donation) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await donation_mgt_api.$_create_donation(branchId, donation)
      success.value = true
      donationData.value = response.data.data
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to create donation"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    donationData,
    createDonation,
  }
}
