import {getPhotos} from '@/api/getPhotos'
import Layout from '@/components/common/Layout'
import Card from '@/components/molecules/Card'
import PropTypes from 'prop-types'
import {useEffect, useRef, useState} from 'react'
import Masonry from 'react-masonry-css'

export default function Homepage(props) {
  const [photos, setPhotos] = useState(props.photos)
  const [loading, setLoading] = useState(false)
  const [intersecting, setIntersecting] = useState(false)
  const paginationRef = useRef(null)

  /**
   * Handle infinite scroll.
   */
  useEffect(() => {
    async function handleLoadingMore(entities) {
      const target = entities[0]
      if (target.isIntersecting) {
        // We're interesting! Do something!
      }
    }

    // Set Intersection Observer (IO) options.
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25
    }

    // Create IO instance.
    const observer = new IntersectionObserver(
      handleLoadingMore,
      observerOptions
    )

    // Observe the current item.
    if (paginationRef.current) {
      observer.observe(paginationRef.current)
    }

    // Run clean up function.
    return () => {
      observer.disconnect()
    }
  }, [loading])

  return (
    <Layout>
      {photos.length === 0 ? (
        <p>Sorry. There was an issue getting photos. Please try again later.</p>
      ) : (
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
      )}
      {/* When this appears on screen, it will trigger fetching more posts */}
      <div ref={paginationRef}>
        <p>Fetching more photos...</p>
      </div>
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
