# Display my photos from Unsplash

## To Do

1. Set connection variables in an ENV file ✅
2. Create connector partial that sets up a request ✅
3. Create a fetcher with useSWR or Axios ✅
4. Query 500 images from Unsplash API at build time, with 60 second revalidation ✅
5. Lazy load the first 9 images in a masonry grid ✅
6. Using a button, lazy load the next images
7. Create single page for each image, which includes all the details ✅
8. Display tags as facet, clicking a facet will filter the photos
9. Use TailwindCSS + CSS Modules for styles ✅
10. Offer dark mode

## Issues

1. Unsplash requires authentication, and storing secrets is hard for infinite scroll because my code is set for build time.
2. I need client-side data fetching and to move Unsplash creds into NEXT*PUBLIC* env vars.
3. The initial fetch is easy, infinite scroll fetches are hard.

## Notes

- Unsplash will only ever return a max of 30 photos.

## Further reading...

- https://nextjs.org/docs/api-reference/next/image
- https://github.com/axios/axios#example (axios docs)
- https://codepen.io/gregrickaby/pen/OJXXNvq (intersection obsever - lazy load images)
- https://unsplash.com/oauth/applications/176226 (api dashboard)
- https://api.unsplash.com/photos/?client_id=3aWzSPDhC2GOV-hK_GtuYrqceonaYwbfdkN4RrWnRi4&page=1&per_page=5&order_by=popular (example request)
