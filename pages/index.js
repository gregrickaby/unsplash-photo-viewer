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
  const [loadingMore, setLoadingMore] = useState(false)
  const page = useRef(2)

  async function loadMorePosts() {
    setLoadingMore(true)

    // Go fetch the next page worth of photos.
    const newPhotos = await getPhotos(page.current)

    // Append new photos to preview photos.
    setPhotos((photos) => [...photos, ...newPhotos])

    // Increment page number after each load.
    page.current++

    setLoadingMore(false)
  }

  useEffect(() => {
    loadMorePosts()
  }, [inView])

  return (
    <Layout>
      <div className="grid">
        {!!photos?.length &&
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
      <div ref={ref} className="mt-4">
        <button
          className="flex border py-2 px-4 m-auto"
          onClick={loadMorePosts}
        >
          {loadingMore ? <>Loading...</> : <>Load More Posts</>}
        </button>
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
