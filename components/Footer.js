import config from '@/functions/config'
export default function Footer() {
  return (
    <footer className="text-sm font-mono">
      <p>
        website by{' '}
        <a href={config.authorUrl} rel="noopener">
          {config.siteAuthor}
        </a>
      </p>
    </footer>
  )
}
