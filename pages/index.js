import {getPhotos} from '@/api/getPhotos'
import Card from '@/components/Card'
import Layout from '@/components/Layout'
import PropTypes from 'prop-types'
import {useRef, useState} from 'react'

export default function Homepage({data}) {
  const [photos, setPhotos] = useState(data)
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
      <div className="grid">
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
      </div>
      <button onClick={loadMore}>Load more photos</button>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await getPhotos()
  return {
    props: {
      data
    },
    revalidate: 60
  }
}

Homepage.propTypes = {
  data: PropTypes.array
}
