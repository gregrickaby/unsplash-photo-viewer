import {useEffect, useState} from 'react'
import axios from 'axios'

// Generic data fetcher.
export const fetcher = (...args) => fetch(...args).then((res) => res.json()) // eslint-disable-line no-undef

/**
 * On scroll, add or remove a "shrink" class.
 *
 * @param {object} el The header element.
 */
export function shrinkHeader(el) {
  /* eslint-disable */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      el.current.classList.add('shrink')
    } else {
      el.current.classList.remove('shrink')
    }
  })
  /* eslint-enable */
}

export default function usePostSearch(query, sort) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [posts, setPosts] = useState([])
  const [after, setAfter] = useState('')
  const [hasMore, setHasMore] = useState(false)

  // Clear the query on each keystroke.
  useEffect(() => {
    setPosts([])
  }, [query])

  useEffect(() => {
    let cancel // Create a cancel var for Axios.

    axios({
      baseURL: 'https://cors-anywhere.herokuapp.com/https://www.reddit.com/r',
      url: `/${query}/${sort}/.json`,
      params: {limit: 5, after: after},
      cancelToken: new axios.CancelToken((c) => (cancel = c))
    })
      .then((response) => {
        // No data? Bail...
        if (response.data.children >= 0) {
          setLoading(false)
          setError(true)
          return {loading, error, posts, hasMore}
        }

        // Filter out any "self" posts.
        const postsContainImage = response.data.data.children.filter((post) => {
          return post.data.post_hint && post.data.post_hint !== 'self'
        })

        setPosts(postsContainImage)
        setAfter(response.data.data.after)
        setLoading(false)
      })
      .catch((e) => {
        if (axios.isCancel(e)) return
        setError(true)
      })
    return () => cancel()
  }, [query, sort])

  return {loading, error, posts, hasMore}
}
