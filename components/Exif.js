import PropTypes from 'prop-types'

export default function Exif(data) {
  const {
    height,
    width,
    exif: {make, model, exposure_time, aperture, focal_length, iso}
  } = data
  return (
    <>
      <strong>EXIF</strong>
      <p>
        Size: {width} × {height}
      </p>
      <p>Camera Make: {make}</p>
      <p>Camera Model: {model}</p>
      <p>Aperture: ƒ/{aperture}</p>
      <p>Focal Length: {focal_length}</p>
      <p>Shutter Speed: {exposure_time}s</p>
      <p>ISO: {iso}</p>
    </>
  )
}

Exif.propTypes = {
  data: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    exif: PropTypes.shape({
      make: PropTypes.string,
      model: PropTypes.string,
      exposure_time: PropTypes.string,
      aperture: PropTypes.string,
      focal_length: PropTypes.string,
      iso: PropTypes.number
    })
  })
}
