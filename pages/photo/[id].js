import {getPhotoById, getPhotos} from '@/api/getPhotos'
import Layout from '@/components/common/Layout'
import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types'

export default function Photo({photo}) {
  const {
    width,
    height,
    description,
    alt_description,
    likes,
    views,
    downloads,
    urls: {regular},
    exif: {make, model, exposure_time, aperture, focal_length, iso},
    user: {
      name,
      links: {html},
      profile_image: {small}
    }
  } = photo
  return (
    <Layout>
      <div className="wrap">
        <h1>{description}</h1>
        <img src={regular} alt={alt_description} loading="lazy" />

        <div>
          <p>
            <strong>Photographer</strong>
          </p>
          <a href={html}>
            <Image src={small} height={32} width={32} alt={name} />
            <p>{name}</p>
          </a>
        </div>

        <div>
          <p>
            <strong>Social Stats</strong>
          </p>
          <p>Likes {likes.toLocaleString('en')}</p>
          <p>Views {views.toLocaleString('en')}</p>
          <p>Downloads {downloads.toLocaleString('en')}</p>
        </div>

        <div>
          <p>
            <strong>Technical Details</strong>
          </p>
          <p>Camera Make {make}</p>
          <p>Camera Model {model}</p>
          <p>Focal Length {focal_length}</p>
          <p>Aperture ƒ/{aperture}</p>
          <p>Shutter Speed {exposure_time}s</p>
          <p>ISO {iso}</p>
          <p>
            Dimensions {width} × {height}
          </p>
        </div>

        <Link href="/">
          <a>Go Back</a>
        </Link>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const photos = await getPhotos()

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
