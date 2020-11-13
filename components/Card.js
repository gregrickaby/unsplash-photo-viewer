import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types'

export default function Card(data) {
  const {id, alt, source, height, width} = data

  return (
    <article className="card">
      <Link href={`/photo/${id}`}>
        <a aria-label={alt}>
          <div className="card-container">
            <Image
              src={source}
              alt={alt}
              layout="responsive"
              width={width}
              height={height}
            />
          </div>
        </a>
      </Link>
    </article>
  )
}

Card.propTypes = {
  data: PropTypes.shape({
    alt: PropTypes.string,
    height: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired
  })
}
