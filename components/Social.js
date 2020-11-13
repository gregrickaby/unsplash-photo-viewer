import PropTypes from 'prop-types'

export default function Social(data) {
  const {downloads, likes, views} = data
  return (
    <div>
      <strong>Social</strong>
      <p>Likes: {likes.toLocaleString('en')}</p>
      <p>Views: {views.toLocaleString('en')}</p>
      <p>Downloads: {downloads.toLocaleString('en')}</p>
    </div>
  )
}

Social.propTypes = {
  data: PropTypes.shape({
    downloads: PropTypes.string.isRequired,
    likes: PropTypes.string.isRequired,
    views: PropTypes.string.isRequired
  })
}
