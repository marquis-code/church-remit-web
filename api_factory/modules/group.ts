import { GATEWAY_ENDPOINT } from "../axios.config";

// Type Definitions
export type Group = {
  name: string
  description?: string
  type: 'ministry' | 'fellowship' | 'committee' | string
  meetingSchedule?: string
  meetingLocation?: string
}

export type GroupMemberPayload = {
  role: 'member' | 'leader' | 'assistant' | string
}


export const group_mgt_api = {
    $_create_group: async (id: string, payload: Group) => {
      const url = `/groups/branch/${id}`
      return GATEWAY_ENDPOINT.post(url, payload)
    },
  
    $_get_groups: async (metadata: { type: string, status: string }) => {
      const url = `/groups/branch/${id}?type=${metadata.type}&status=${metadata.status}`
      return GATEWAY_ENDPOINT.get(url)
    },
  
    $_add_member_to_group: async (groupId: string, memberId: string, payload: GroupMemberPayload) => {
      const url = `/groups/${groupId}/members/${memberId}`
      return GATEWAY_ENDPOINT.post(url, payload)
    }
  }
  