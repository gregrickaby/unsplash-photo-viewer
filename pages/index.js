import {getPhotos} from '@/api/getPhotos'
import Layout from '@/components/common/Layout'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Masonry from 'react-masonry-css'

export default function Homepage(props) {
  return (
    <Layout>
      <div className="the-grid">
        <Masonry
          breakpointCols={3}
          className="masonry-grid"
          columnClassName="masonry-grid-column"
        >
          {props.photos.map((photo) => {
            const {
              id,
              alt_description,
              urls: {regular}
            } = photo
            return (
              <div className="card" key={id}>
                <Link href={`/photo/${id}`}>
                  <a aria-label={alt_description}>
                    <img src={regular} alt={alt_description} />
                  </a>
                </Link>
              </div>
            )
          })}
        </Masonry>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const photos = await getPhotos(25)
  return {
    props: {
      photos
    },
    revalidate: 60
  }
}

Homepage.propTypes = {
  photos: PropTypes.array
}
