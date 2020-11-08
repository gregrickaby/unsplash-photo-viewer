import {unsplashApi} from '../connector'
import PropTypes from 'prop-types'

/**
 * Fetch photos from Unsplash.
 *
 * @param {integer} perPage The number of photos to fetch.
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

getPhotos.propTypes = {
  perPage: PropTypes.number.isRequired
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

getPhotoById.propTypes = {
  id: PropTypes.string.isRequired
}
