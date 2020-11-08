import {getPhotos} from '@/api/getPhotos'
import Layout from '@/components/common/Layout'
import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types'

export default function Homepage(props) {
  return (
    <Layout>
      {props.photos.map((photo) => {
        const {
          id,
          alt_description,
          urls: {regular}
        } = photo
        return (
          <div
            className="relative"
            style={{width: '768px', height: '768px'}}
            key={id}
          >
            <Link href={`/photo/${id}`}>
              <a aria-label={alt_description}>
                <Image
                  src={regular}
                  alt={alt_description}
                  layout="fill"
                  objectFit="cover"
                  quality={80}
                />
              </a>
            </Link>
          </div>
        )
      })}
    </Layout>
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

Homepage.propTypes = {
  photos: PropTypes.array
}
