import config from '@/lib/config'
import cn from 'classnames'
import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
  const {siteName, siteDescription} = config

  return (
    <header className={styles.header}>
      <div className={cn('wrap', styles.container)}>
        <Link href="/">
          <a>
            <h1 className={styles.siteName}>{siteName}</h1>
          </a>
        </Link>
        <p className={styles.siteDescription}>{siteDescription}</p>
      </div>
    </header>
  )
}
