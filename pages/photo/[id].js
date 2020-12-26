import {getPhotoById, getPhotos} from '@/api/getPhotos'
import Description from '@/components/Description'
import Exif from '@/components/Exif'
import Figure from '@/components/Figure'
import Layout from '@/components/Layout'
import Photographer from '@/components/Photographer'
import Social from '@/components/Social'
import {useRouter} from 'next/router'
import PropTypes from 'prop-types'
import {useState} from 'react'

export default function Photo({data}) {
  const [showDetails, setShowDetails] = useState(false)
  const router = useRouter()
  const {
    width,
    height,
    description,
    alt_description,
    likes,
    views,
    downloads,
    urls: {full},
    exif,
    user: {
      name,
      links: {html},
      profile_image: {small}
    }
  } = data

  function showDetailsToggler() {
    setShowDetails((prev) => !prev)
  }

  // If the page wasn't statically generated,
  // display "loading" until Next.js builds
  // the page silently in the background.
  if (router.isFallback) {
    return (
      <Layout>
        <h1>Loading...</h1>
      </Layout>
    )
  }

  return (
    <Layout>
      <Figure
        source={full}
        description={alt_description}
        height={height}
        width={width}
      />

      <aside className="flex py-4 justify-between items-center">
        <a href="/">&#x2190; Back</a>

        <div>
          <button onClick={showDetailsToggler}>Show Details</button>
          {showDetails && (
            <div className="text-left">
              <Description description={description} />
              <Photographer avatar={small} link={html} name={name} />
              <Social downloads={downloads} likes={likes} views={views} />
              <Exif height={height} width={width} exif={exif} />
            </div>
          )}
        </div>
      </aside>
    </Layout>
  )
}

export async function getStaticPaths() {
  const photos = await getPhotos()
  const paths = photos.map((photo) => ({
    params: {
      id: photo.id
    }
  }))

  return {
    paths,
    fallback: 'blocking' // We don't know all the IDs, so SSR those pages.
  }
}

export async function getStaticProps({params}) {
  const data = await getPhotoById(params.id)

  return {
    props: {
      data
    },
    revalidate: 300
  }
}

Photo.propTypes = {
  data: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    description: PropTypes.string,
    alt_description: PropTypes.string,
    likes: PropTypes.number,
    views: PropTypes.number,
    downloads: PropTypes.number,
    urls: PropTypes.shape({
      full: PropTypes.string
    }),
    exif: PropTypes.shape({
      make: PropTypes.string,
      model: PropTypes.string,
      exposure_time: PropTypes.string,
      aperture: PropTypes.string,
      focal_length: PropTypes.string,
      iso: PropTypes.number
    }),
    user: PropTypes.shape({
      name: PropTypes.string,
      links: PropTypes.shape({
        html: PropTypes.string
      }),
      profile_image: PropTypes.shape({
        small: PropTypes.string
      })
    })
  })
}
