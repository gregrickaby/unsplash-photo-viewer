import axios from 'axios'

// Define basic axios config.
const axiosConfig = {
  baseURL: process.env.UNSPLASH_BASE_URL,
  headers: {'Content-Type': 'application/json'},
  params: {
    client_id: process.env.UNSPLASH_APP_ACCESS_KEY,
    order_by: 'popular'
  },
  responseType: 'json'
}

/**
 * Set up instance of axios with default config for querying Unsplash API.
 */
export const unsplashApi = axios.create(axiosConfig)
