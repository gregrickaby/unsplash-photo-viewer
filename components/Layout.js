import config from '@/functions/config'
import PropTypes from 'prop-types'
import Footer from './Footer'
import Header from './Header'
import Meta from './Meta'

export default function Layout({children, ...props}) {
  const {title, description} = props

  return (
    <div className="max-w-4xl p-4 m-auto text-center">
      <Meta title={title} description={description} />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
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
