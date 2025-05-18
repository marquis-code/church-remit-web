import { ref } from "vue"
import { donation_mgt_api, type Donation, type DonationQueryParams } from "@/api_factory/modules/donation"

export const useDonation = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const donations = ref<Donation[]>([])

  const createDonation = async (branchId: string, donationData: Donation) => {
    loading.value = true
    error.value = null

    try {
      const response = await donation_mgt_api.$_create_donation(branchId, donationData)
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to create donation"
      throw err
    } finally {
      loading.value = false
    }
  }

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
    createDonation,
    getDonations,
  }
}
