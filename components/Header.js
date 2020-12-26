import config from '@/functions/config'
import Link from 'next/link'

export default function Header() {
  return (
    <header id="header" className="max-w-sm m-auto">
      <h1 className="text-4xl mb-4">
        <Link href="/">
          <a>{config.siteName}</a>
        </Link>
      </h1>
      <p className="text-1xl mb-4">{config.siteDescription}</p>
    </header>
  )
}
