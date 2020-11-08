import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="sticky top-0 py-8 transition-all bg-white border-b border-gray-200">
      <div className="container px-4 lg:px-0 flex items-center justify-between">
        <Link href="/">
          <a>
            <Image
              src="/logo.svg"
              alt="website logo"
              loading="lazy"
              height="128"
              width="128"
            />
          </a>
        </Link>
      </div>
    </header>
  )
}
