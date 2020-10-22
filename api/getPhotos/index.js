import {unsplashApi} from '../connector'

/**
 * Fetch photos from Unsplash.
 *
 * @param integer perPage The number of photos to fetch.
 */
export async function getPhotos(perPage) {
  const limit = perPage ? `?per_page=${perPage}` : `?per_page=5`
  return await unsplashApi
    .get(`/photos${limit}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error)
    })
}

/**
 * Fetch a photo based on the ID from Unsplash.
 *
 * @param string id The photo ID to fetch.
 */
export async function getPhoto(id) {
  return await unsplashApi
    .get(`/photos/${id}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error)
    })
}
