import {getPhotos} from '@/api/getPhotos'
import Layout from '@/components/common/Layout'
import Card from '@/components/molecules/Card'
import PropTypes from 'prop-types'
import {useRef, useState} from 'react'

export default function Homepage(props) {
  const [photos, setPhotos] = useState(props.photos)
  const page = useRef(2)

  async function loadMore() {
    // Go fetch the next page worth of photos.
    const newPhotos = await getPhotos(page.current)

    // Append new photos to preview photos.
    setPhotos((photos) => [...photos, ...newPhotos])

    // Increment page number after each load.
    page.current++
  }

  return (
    <Layout>
      {!!photos &&
        photos.length > 0 &&
        photos.map((photo, index) => {
          return (
            <Card
              key={index}
              id={photo.id}
              alt={photo.alt_description}
              src={photo.urls.regular}
            />
          )
        })}
      <button
        className="bg-gray-400 p-4 mt-4 flex justify-center m-auto text-center"
        onClick={loadMore}
      >
        Load more photos
      </button>
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
