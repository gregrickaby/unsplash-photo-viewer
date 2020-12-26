import PropTypes from 'prop-types'

export default function Description(data) {
  const {description} = data

  if (!description) {
    return <></>
  }

  return (
    <div>
      <strong>Description</strong>
      <h1>{description}</h1>
    </div>
  )
}

Description.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string
  })
}
