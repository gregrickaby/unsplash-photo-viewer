import {getPhotos} from '@/api/getPhotos'
import Layout from '@/components/common/Layout'
import Card from '@/components/molecules/Card'
import PropTypes from 'prop-types'
import {useRef, useState} from 'react'
import Masonry from 'react-masonry-css'

export default function Homepage(props) {
  const [photos, setPhotos] = useState(props.photos)
  const [state, setState] = useState('finished')
  const page = useRef(2)

  function fetchSomething() {
    // Update our app state.
    setState('loading')

    const url = `https://api.unsplash.com/photos/?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_APP_ACCESS_KEY}&page=${page.current}&per_page=9&order_by=latest`

    // Fetch
    fetch(url)
      .then((response) => {
        // If there's no response...
        if (!response.ok) {
          setState('error')
        }
        return response.json()
      })
      // If everything is good...
      .then((data) => {
        // Spread in previous photos, and append new photos.
        setPhotos((photos) => [...photos, ...data])
        setState('finished')
        page.current++ // increment our page number.
      })
      .catch(() => setState('error'))
  }

  if (state === 'error')
    return (
      <Layout>
        <p>There was an error loading photos. Please try again later.</p>
      </Layout>
    )

  return (
    <Layout>
      <Masonry
        breakpointCols={3}
        className="masonry-grid"
        columnClassName="masonry-grid-column"
      >
        {photos.map((photo, index) => {
          return (
            <Card
              key={index}
              id={photo.id}
              alt={photo.alt_description}
              src={photo.urls.regular}
            />
          )
        })}
      </Masonry>
      <button
        className="bg-gray-400 p-4 mt-4 flex justify-center m-auto text-center"
        onClick={fetchSomething}
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
