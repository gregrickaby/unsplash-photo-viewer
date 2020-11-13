import {getPhotoById} from '@/api/getPhotos'
import Description from '@/components/Description'
import Figure from '@/components/Figure'
import Layout from '@/components/Layout'
import Photographer from '@/components/Photographer'
import Social from '@/components/Social'
import Technical from '@/components/Technical'
import Link from 'next/link'
import PropTypes from 'prop-types'
import {useRef, useState} from 'react'

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

  const [dialog, setDialog] = useState(false)
  const detailsDialog = useRef(null)

  function toggleDialog() {
    if (dialog) {
      setDialog(false)
      detailsDialog.current.close()
    }

    if (!dialog) {
      setDialog(true)
      detailsDialog.current.show()
    }
  }

  return (
    <Layout>
      <Figure
        source={full}
        description={alt_description}
        height={height}
        width={width}
      />

      <div className="footer">
        <button onClick={toggleDialog}>Details</button>

        <Link href="/">
          <button>Back</button>
        </Link>
      </div>

      <dialog
        className="dialog"
        ref={detailsDialog}
        onKeyDown={(e) => {
          if (e.code === 'Escape') toggleDialog()
        }}
      >
        <button className="close-dialog" onClick={toggleDialog}>
          <span className="sr-only">Close details</span>X
        </button>
        <div className="details">
          <Description description={description} />
          <Photographer avatar={small} link={html} name={name} />
          <Social downloads={downloads} likes={likes} views={views} />
          <Technical height={height} width={width} exif={exif} />
        </div>
      </dialog>
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
