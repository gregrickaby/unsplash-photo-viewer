import PropTypes from 'prop-types'

export default function Photographer(data) {
  const {avatar, link, name} = data
  return (
    <>
      <strong>Photographer</strong>
      <div className="flex items-center">
        <img className="mr-2" src={avatar} height={32} width={32} alt={name} />
        <a href={link}>
          <p>{name}</p>
        </a>
      </div>
    </>
  )
}

Photographer.propTypes = {
  data: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })
}
