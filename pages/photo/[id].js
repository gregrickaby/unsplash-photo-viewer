import {getPhotoById} from '@/api/getPhotos'
import Description from '@/components/Description'
import Exif from '@/components/Exif'
import Figure from '@/components/Figure'
import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import Photographer from '@/components/Photographer'
import Social from '@/components/Social'
import Link from 'next/link'
import PropTypes from 'prop-types'

export default function Photo({data}) {
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

  return (
    <Layout>
      <Figure
        source={full}
        description={alt_description}
        height={height}
        width={width}
      />

      <Modal>
        <Description description={description} />
        <Photographer avatar={small} link={html} name={name} />
        <Social downloads={downloads} likes={likes} views={views} />
        <Exif height={height} width={width} exif={exif} />
      </Modal>

      <div className="footer">
        <Link href="/">
          <button>&#x2190; Back</button>
        </Link>
        <a className="button" href="#modal">
          Details
        </a>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({params}) {
  const data = await getPhotoById(params.id)
  return {props: {data}}
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
