import PropTypes from 'prop-types'
import {getPhotos} from '@/api/getPhotos'
import Link from 'next/link'

export default function Photos(props) {
  return (
    <>
      {props.photos.map((photo) => {
        const {
          id,
          alt_description,
          urls: {regular}
        } = photo
        return (
          <Link href={`/photo/${id}`} key={id}>
            <a aria-label={alt_description}>
              <img
                src={regular}
                alt={alt_description}
                loading="lazy"
                width="1080"
              />
            </a>
          </Link>
        )
      })}
    </>
  )
}

export async function getStaticProps() {
  const photos = await getPhotos(5)
  return {
    props: {
      photos
    },
    revalidate: 5
  }
}

Photos.propTypes = {
  photos: PropTypes.array
}
