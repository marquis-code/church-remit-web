import { GATEWAY_ENDPOINT } from '../axios.config'

// Type Definitions

export type Availability = {
  sunday?: boolean
  monday?: boolean
  tuesday?: boolean
  wednesday?: boolean
  thursday?: boolean
  friday?: boolean
  saturday?: boolean
}

export type VolunteerProfile = {
  department: string
  position: string
  skills?: string
  startDate: string
  availability?: Availability
  trainingCompleted?: string[]
}

export type VolunteerQueryParams = {
  department?: string
  status?: string
}


export const volunteer_mgt_api = {
    $_create_volunteer_profile: async (id: string, payload: VolunteerProfile) => {
      const url = `/volunteers/member/${id}`
      return axios.post(url, payload)
    },
  
    $_get_volunteers: async (branchId: string, params?: VolunteerQueryParams) => {
      const url = `/volunteers/branch/${branchId}`
      return axios.get(url, { params })
    },
  
    $_update_volunteer_profile: async (volunteerId: string, payload: VolunteerProfile) => {
      const url = `/volunteers/${volunteerId}`
      return axios.put(url, payload)
    }
  }
  