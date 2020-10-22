import {unsplashApi} from '../connector'

/**
 * Retrieve general site settings.
 *
 * @return {Object} General site settings.
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
