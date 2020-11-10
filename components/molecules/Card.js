import cn from 'classnames'
import Link from 'next/link'
import PropTypes from 'prop-types'
import styles from './Card.module.css'

export default function Card(props) {
  const {id, alt, src} = props
  return (
    <div className={cn(styles.Card)}>
      <Link href={`/photo/${id}`}>
        <a aria-label={alt}>
          <img src={src} alt={alt} />
        </a>
      </Link>
    </div>
  )
}

Card.propTypes = {
  id: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.string
}
