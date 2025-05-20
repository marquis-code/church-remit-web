import { GATEWAY_ENDPOINT } from "../axios.config";

// Type Definitions
export type Member = {
  firstName: string
  lastName: string
  middleName?: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  gender: 'male' | 'female' | 'other'
  address: string
  city: string
  state: string
  country: string
  postalCode: string
  occupation?: string
  joinDate: string
}

export type FollowUpStatus = {
  lastContact: string
  nextContact: string
  notes: string
  status: 'active' | 'inactive' | 'pending'
  assignedTo: string
}

export const member_mgt_api = {
    $_create_member: async (id: string, payload: Member) => {
      const url = `/members/branch/${id}`
      return GATEWAY_ENDPOINT.post(url, payload)
    },
  
    $_get_members: async (metadata: { status: sting, search: string }) => {
      const url = `/members/branch/${id}?status=${metadata.status}&search=${metadata.search}`
      return GATEWAY_ENDPOINT.get(url)
    },
  
    $_get_member_details: async (id: string) => {
      const url = `/members/${id}`
      return GATEWAY_ENDPOINT.get(url)
    },
  
    $_update_member: async (id: string, payload: Member) => {
      const url = `/members/${id}`
      return GATEWAY_ENDPOINT.put(url, payload)
    },
  
    $_update_follow_up_status: async (id: string, status: FollowUpStatus) => {
      const url = `/members/${id}/follow-up`
      return GATEWAY_ENDPOINT.put(url, { followUpStatus: status })
    },
  
    $_delete_member: async (id: string) => {
      const url = `/members/${id}`
      return GATEWAY_ENDPOINT.delete(url)
    }
  }
  