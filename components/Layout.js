import config from '@/functions/config'
import PropTypes from 'prop-types'
import Meta from './Meta'

export default function Layout({children, ...props}) {
  const {title, description} = props

  return (
    <>
      <Meta title={title} description={description} />
      <main className="container">{children}</main>
    </>
  )
}

Layout.defaultProps = {
  description: config.siteDescription,
  title: config.siteName
}

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  description: PropTypes.string,
  title: PropTypes.string
}
