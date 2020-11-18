import PropTypes from 'prop-types'

export default function Modal({children}) {
  return (
    <div id="modal">
      <div className="modal-window">
        <a className="modal-close" href="#">
          X
        </a>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.any.isRequired
}
