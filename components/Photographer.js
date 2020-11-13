import PropTypes from 'prop-types'

export default function Photographer(data) {
  const {avatar, link, name} = data
  return (
    <div className="credits">
      <strong>Photographer</strong>
      <div className="photographer">
        <img src={avatar} height={32} width={32} alt={name} />
        <a href={link}>
          <p>{name}</p>
        </a>
      </div>
    </div>
  )
}

Photographer.propTypes = {
  data: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })
}
