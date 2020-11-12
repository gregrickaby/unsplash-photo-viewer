import {unsplashApi} from '../connector'

/**
 * Fetch photos from Unsplash.
 *
 * @param {integer} perPage The number of photos to fetch.
 */
export async function getPhotos(pageNumber, perPage, orderBy) {
  const page = pageNumber ? pageNumber : 1
  const limit = perPage ? perPage : 30
  const sort = orderBy ? orderBy : 'latest'

  return await unsplashApi
    .get(`/photos?page=${page}&per_page=${limit}&order_by=${sort}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error)
    })
}

/**
 * Fetch a single photo based on the ID.
 *
 * @param {string} id The photo ID to fetch.
 */
export async function getPhotoById(id) {
  return await unsplashApi
    .get(`/photos/${id}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.error(error)
    })
}
