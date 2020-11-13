import Link from 'next/link'
import PropTypes from 'prop-types'

export default function Card(props) {
  const {id, alt, src} = props

  return (
    <article className="card">
      <Link href={`/photo/${id}`}>
        <a aria-label={alt}>
          <div className="card-container">
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
