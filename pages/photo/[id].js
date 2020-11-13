import {getPhotoById} from '@/api/getPhotos'
import Layout from '@/components/common/Layout'
import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types'
import {useRef, useState} from 'react'
import styles from './single.module.css'

export default function Photo({photo}) {
  const {
    width,
    height,
    description,
    alt_description,
    likes,
    views,
    downloads,
    urls: {full},
    exif: {make, model, exposure_time, aperture, focal_length, iso},
    user: {
      name,
      links: {html},
      profile_image: {small}
    }
  } = photo

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
      <article className={styles.single}>
        <figure className={styles.imageContainer}>
          <Image
            className={styles.image}
            src={full}
            alt={alt_description}
            layout="responsive"
            width={width}
            height={height}
          />
        </figure>

        <dialog
          className={styles.dialog}
          ref={detailsDialog}
          onKeyDown={(e) => {
            if (e.code === 'Escape') toggleDialog()
          }}
        >
          <header className={styles.header}>
            <h1 className={styles.title}>{description}</h1>
          </header>

          <div className={styles.details}>
            <div className={styles.credits}>
              <strong>Photographer</strong>
              <div className={styles.photographer}>
                <img src={small} height={32} width={32} alt={name} />
                <a href={html}>
                  <p>{name}</p>
                </a>
              </div>
            </div>
            <div className={styles.social}>
              <strong>Social Stats</strong>
              <p>Likes: {likes.toLocaleString('en')}</p>
              <p>Views: {views.toLocaleString('en')}</p>
              <p>Downloads: {downloads.toLocaleString('en')}</p>
            </div>
            <div className={styles.technical}>
              <strong>Technical Details</strong>
              <p>Camera Make: {make}</p>
              <p>Camera Model: {model}</p>
              <p>Focal Length: {focal_length}</p>
              <p>Aperture: ƒ/{aperture}</p>
              <p>Shutter Speed: {exposure_time}s</p>
              <p>ISO: {iso}</p>
              <p>
                Dimensions: {width} × {height}
              </p>
            </div>
          </div>
        </dialog>

        <button onClick={toggleDialog}>Show info</button>

        <Link href="/">
          <a>Go Back</a>
        </Link>
      </article>
    </Layout>
  )
}

export async function getServerSideProps({params}) {
  const photo = await getPhotoById(params.id)
  return {props: {photo}}
}

Photo.propTypes = {
  photo: PropTypes.shape({
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
