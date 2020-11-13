import cn from 'classnames'
import Link from 'next/link'
import PropTypes from 'prop-types'
import styles from './Card.module.css'

export default function Card(props) {
  const {id, alt, src} = props

  return (
    <article className={styles.card}>
      <Link href={`/photo/${id}`}>
        <a aria-label={alt}>
          <div className={cn(styles.cardContainer)}>
            <img src={src} alt={alt} loading="lazy" />
          </div>
        </a>
      </Link>
    </article>
  )
}

Card.propTypes = {
  id: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.string
}
