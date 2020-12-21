import axios from 'axios'
import axiosRetry from 'axios-retry'

/**
 * Define Axios Retry options.
 *
 * @see https://github.com/softonic/axios-retry#usage
 */
const axiosRetryOptions = {
  retries: 10,
  retryDelay: axiosRetry.exponentialDelay
}

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
axiosRetry(unsplashApi, axiosRetryOptions)
