import config from '@/lib/config'
import cn from 'classnames'
import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  const {
    author,
    siteName,
    social: {github, twitter}
  } = config

  return (
    <footer className={styles.footer}>
      <div className={cn('wrap', styles.container)}>
        &copy; {new Date().getFullYear()} {siteName} by {author} &middot;{' '}
        <Link href={github.href}>
          <a>Github</a>
        </Link>{' '}
        &middot;{' '}
        <Link href={twitter.href}>
          <a>Twitter</a>
        </Link>
      </div>
    </footer>
  )
}
