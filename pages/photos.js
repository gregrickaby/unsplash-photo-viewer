import {getPhotos} from '@/api/getPhotos'

export default function Photos(props) {
  return (
    <>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </>
  )
}

export async function getStaticProps() {
  const photos = await getPhotos(5)
  return {
    props: {
      photos
    },
    revalidate: 5
  }
}
