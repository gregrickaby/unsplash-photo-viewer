import {getPhotos} from '@/api/getPhotos'
import Card from '@/components/Card'
import Layout from '@/components/Layout'
import PropTypes from 'prop-types'
import {useEffect, useRef, useState} from 'react'
import {useInView} from 'react-intersection-observer'

export default function Homepage({data}) {
  const [ref, inView] = useInView({
    rootMargin: '200px 0px'
  })
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

  useEffect(() => {
    loadMore()
  }, [inView])

  return (
    <Layout>
      <div className="grid">
        {!!photos &&
          photos.length > 0 &&
          photos.map((photo, index) => {
            return (
              <Card
                key={index}
                id={photo?.id}
                alt={photo?.alt_description}
                source={photo?.urls.regular}
                height={photo?.height}
                width={photo?.width}
              />
            )
          })}
      </div>
      <div ref={ref}>
        <button onClick={loadMore}>Load more photos</button>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const data = await getPhotos()

  return {
    props: {
      data
    },
    revalidate: 300
  }
}

Homepage.propTypes = {
  data: PropTypes.array
}
