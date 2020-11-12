import axios from 'axios'

/**
 * Set up Axios config options.
 *
 * @see https://github.com/axios/axios#request-config
 */
const axiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_UNSPLASH_BASE_URL,
  headers: {'Content-Type': 'application/json'},
  params: {
    client_id: process.env.NEXT_PUBLIC_UNSPLASH_APP_ACCESS_KEY
  },
  responseType: 'json'
}

/**
 * Export an instance of Axios.
 */
export const unsplashApi = axios.create(axiosConfig)
