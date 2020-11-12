import {getPhotos} from '@/api/getPhotos'
import Layout from '@/components/common/Layout'
import Card from '@/components/molecules/Card'
import PropTypes from 'prop-types'
import Masonry from 'react-masonry-css'

export default function Homepage(props) {
  const photos = props.photos

  return (
    <Layout>
      <Masonry
        breakpointCols={3}
        className="masonry-grid"
        columnClassName="masonry-grid-column"
      >
        {photos.map((photo) => {
          return (
            <Card
              key={photo.id}
              id={photo.id}
              alt={photo.alt_description}
              src={photo.urls.regular}
            />
          )
        })}
      </Masonry>
    </Layout>
  )
}

export async function getStaticProps() {
  const photos = await getPhotos()
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
