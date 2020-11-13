import Image from 'next/image'
import PropTypes from 'prop-types'

export default function Figure(data) {
  const {source, description, width, height} = data
  return (
    <figure className="image-container">
      <Image
        src={source}
        alt={description}
        layout="responsive"
        width={width}
        height={height}
      />
    </figure>
  )
}

Figure.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    source: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired
  })
}
