import { ref } from "vue"
import { donation_mgt_api, type Donation, type DonationQueryParams } from "@/api_factory/modules/donation"

export const useGetDonations = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const donations = ref<Donation[]>([])

  const getDonations = async (branchId: string, params?: DonationQueryParams) => {
    loading.value = true
    error.value = null

    try {
      const response = await donation_mgt_api.$_get_donations(branchId, params)
      donations.value = response.data.data || []
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch donations"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    donations,
    getDonations,
  }
}
