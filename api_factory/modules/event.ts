import { GATEWAY_ENDPOINT } from "../axios.config";

// Type Definitions

export type RecurringPattern = {
  frequency: 'daily' | 'weekly' | 'monthly'
  day?: string            // e.g., 'sunday' for weekly
  endDate?: string        // ISO date
}

export type Speaker = {
  name: string
  role?: string
}

export type StreamingLinks = {
  youtube?: string
  facebook?: string
  [platform: string]: string | undefined
}

export type Event = {
  title: string
  description?: string
  startDateTime: string    // ISO string
  endDateTime: string      // ISO string
  type: 'service' | 'conference' | 'meeting' | string
  facilityId: string
  isRecurring?: boolean
  recurringPattern?: RecurringPattern
  speakers?: Speaker[]
  streamingLinks?: StreamingLinks
}

export type VolunteerAssignment = {
  volunteerId: string
  role: string
  notes?: string
}

type EventQueryParams = {
    startDate?: string
    endDate?: string
    type?: string
  }

export const event_mgt_api = {
    $_create_event: async (id: string, payload: Event) => {
      const url = `/events/branch/${id}`
      return GATEWAY_ENDPOINT.post(url, payload)
    },
  
    $_get_events: async (branchId: string, params?: EventQueryParams) => {
        const url = `${GATEWAY_ENDPOINT}/events/branch/${branchId}`
        return GATEWAY_ENDPOINT.get(url, { params })
      },
  
    $_assign_volunteer_to_event: async (eventId: string, payload: VolunteerAssignment) => {
      const url = `/events/${eventId}/volunteers`
      return GATEWAY_ENDPOINT.post(url, payload)
    }
  }
  