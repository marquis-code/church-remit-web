import { GATEWAY_ENDPOINT } from "../axios.config";
import { useUser } from '@/composables/auth/user'

export const auth_api = {
  $_create_admin: (credential: {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password: string,
    churchName: string
}) => {
    const url = '/auth/register'
    return GATEWAY_ENDPOINT.post(url, credential)
  },
  $_admin_login: (credential: {
    email: string,
    password: string
}) => {
    const url = '/auth/login'
    return GATEWAY_ENDPOINT.post(url, credential)
  },
  $_verify_email: (token: string) => {
    const url = `/auth/verify-email/${token}`
    return GATEWAY_ENDPOINT.get(url)
  },
  $_forgot_password: (payload: {
    email: string
}) => {
    const url = `/auth/forgot-password`
    return GATEWAY_ENDPOINT.post(url, payload)
  },
  $_reset_password: (payload: {
    password: string
}) => {
     const url = `/auth/reset-password/${token}`
    return GATEWAY_ENDPOINT.post(url, payload)
  }
}
