import config from '@/functions/config'

export default function Header() {
  return (
    <header className="header">
      <h1 className="site-title">{config.siteName}</h1>
      <p className="site-description">{config.siteDescription}</p>
    </header>
  )
}
