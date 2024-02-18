import FeedSkeleton from '@/components/Skeleton'
import VideoCard from '@/components/VideoCard'
import { fetchVideos } from '@/lib/utils'
import { useCategory } from '@/store'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'

const Home = () => {
  const category = useCategory((state) => state.category)
  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchVideos(`search?part=snippet&q=${category}`).then((data) => {
      console.log(data.items)
      setVideos(data.items)
    })
  }, [category])

  return (
    <>
      <Toaster />
      <section className='p-5'>
        <h1 className='text-xl md:text-3xl font-bold mb-5'>
          {category} <span className='text-red-600'>videos</span>
        </h1>
        <div className='grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
          {!videos ? (
            <FeedSkeleton />
          ) : (
            videos?.map((video) => (
              <VideoCard
                className={`w-full`}
                key={video.id.videoId}
                video={video}
              />
            ))
          )}
        </div>
      </section>
    </>
  )
}
export default Home
