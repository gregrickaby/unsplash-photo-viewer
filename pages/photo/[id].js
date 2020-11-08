import {getPhotoById, getPhotos} from '@/api/getPhotos'
import Link from 'next/link'
import PropTypes from 'prop-types'

export default function Photo({photo}) {
  const {
    id,
    description,
    alt_description,
    likes,
    urls: {regular},
    exif: {make, model, exposure_time, aperture, focal_length, is}
  } = photo
  return (
    <>
      <h1>{description}</h1>
      <p>{likes}</p>
      <p>{id}</p>
      <img src={regular} alt={alt_description} loading="lazy" width="1080" />
      <p>{make}</p>
      <p>{model}</p>
      <p>{exposure_time}</p>
      <p>{aperture}</p>
      <p>{focal_length}</p>
      <p>{is}</p>
      <Link href="/photos">
        <a>Go Back</a>
      </Link>
    </>
  )
}

export async function getStaticPaths() {
  const photos = await getPhotos(5)

  return {
    paths: photos.map((photo) => {
      return {
        params: {
          id: `${photo.id}`
        }
      }
    }),
    fallback: false
  }
}

export async function getStaticProps({params}) {
  const photo = await getPhotoById(params.id)
  return {props: {photo}}
}

Photo.propTypes = {
  photo: PropTypes.object
}
