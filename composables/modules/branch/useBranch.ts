import { ref } from "vue"
import { branch_mgt_api, type Branch, type RemittanceConfig } from "@/api_factory/modules/branch"

export const useBranch = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const branches = ref<Branch[]>([])
  const currentBranch = ref<Branch | null>(null)

  const createBranch = async (churchId: string, branchData: Branch) => {
    loading.value = true
    error.value = null

    try {
      const response = await branch_mgt_api.$_create_branch(churchId, branchData)
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to create branch"
      throw err
    } finally {
      loading.value = false
    }
  }

  const getBranches = async (churchId: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await branch_mgt_api.$_get_branches()
      branches.value = response.data.data || []
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch branches"
      throw err
    } finally {
      loading.value = false
    }
  }

  const getBranchDetails = async (branchId: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await branch_mgt_api.$_get_branch_details(branchId)
      currentBranch.value = response.data.data || null
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to fetch branch details"
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateBranch = async (branchId: string, branchData: Branch) => {
    loading.value = true
    error.value = null

    try {
      const response = await branch_mgt_api.$_update_branch(branchId, branchData)
      if (currentBranch.value && currentBranch.value.code === branchData.code) {
        currentBranch.value = { ...currentBranch.value, ...branchData }
      }
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to update branch"
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateRemittanceConfig = async (branchId: string, config: RemittanceConfig) => {
    loading.value = true
    error.value = null

    try {
      const response = await branch_mgt_api.$_update_remittance_config(branchId, config)
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to update remittance configuration"
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteBranch = async (branchId: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await branch_mgt_api.$_delete_branch(branchId)
      branches.value = branches.value.filter((branch) => branch.code !== branchId)
      if (currentBranch.value && currentBranch.value.code === branchId) {
        currentBranch.value = null
      }
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to delete branch"
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    branches,
    currentBranch,
    createBranch,
    getBranches,
    getBranchDetails,
    updateBranch,
    updateRemittanceConfig,
    deleteBranch,
  }
}
