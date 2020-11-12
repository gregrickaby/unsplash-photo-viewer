import config from '@/lib/config'
import PropTypes from 'prop-types'
import Footer from '../organisms/Footer'
import Header from '../organisms/Header'
import Meta from './Meta'

export default function Layout({children, ...props}) {
  const {title, description} = props

  return (
    <>
      <Meta title={title} description={description} />
      <Header />
      <main className="container">{children}</main>
      <Footer />
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
