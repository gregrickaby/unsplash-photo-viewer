import config from '@/functions/config'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="header">
      <h1 className="site-title">
        <Link href="/">
          <a>{config.siteName}</a>
        </Link>
      </h1>
      <p className="site-description">{config.siteDescription}</p>
    </header>
  )
}
