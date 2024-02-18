import { fetchRelatedVideos, fetchVideoDetails } from '@/lib/utils'
import { Avatar, Spinner } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom'

import VideoCard from '@/components/VideoCard'
import { BiLike } from 'react-icons/bi'
import { PiShareFatLight } from 'react-icons/pi'

const VideoContent = ({ location }) => {
  const { id } = useParams()
  const state = location?.state
  const [videoDetails, setVideoDetails] = useState(null)
  const [relatedVideos, setRelatedVideos] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const date = new Date(videoDetails?.snippet?.publishedAt)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const readableTime = date.toLocaleDateString('en-US', options)

  useEffect(() => {
    const fetchData = async () => {
      const videoData = await fetchVideoDetails(id)
      const relatedVideoData = await fetchRelatedVideos(id)
      setVideoDetails(videoData)
      setRelatedVideos(relatedVideoData.items)
      setIsLoading(false)
    }

    fetchData()
  }, [id])

  // only used to log the fetchData -- to remove afterwards
  useEffect(() => {
    console.log('videoDetails', videoDetails)
    console.log('relatedVideos', relatedVideos)
  }, [videoDetails, relatedVideos])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.href}`)
    toast.success('Link copied to clipboard')
  }

  const numberWithCommas = (number) => {
    const count = parseInt(number, 10)
    if (count) return count.toLocaleString()
    return '-'
  }

  return (
    <>
      <Toaster />
      <main className='p-5 w-full'>
        {isLoading ? (
          <div className='flex justify-center items-center'>
            <Spinner className='animate-spin' />
          </div>
        ) : (
          <div className='w-full flex flex-col gap-7'>
            {/* video player */}
            <div className='flex justify-center bg-foreground rounded-xl lg:rounded-3xl overflow-hidden shadow-md'>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                controls
                width='100%'
                height={window.innerWidth <= 640 ? '230px' : '800px'}
              />
            </div>

            {/* title */}
            <h1 className='text-xl font-semibold line-clamp-2'>
              {videoDetails?.snippet?.title}
            </h1>

            <div className='flex justify-between items-center'>
              {/* creator details */}
              <div className='flex gap-3 items-center'>
                <div className='min-w-max flex overflow-hidden'>
                  <Avatar
                    src={state?.channelThumb}
                    name={videoDetails?.snippet?.channelTitle}
                    size='md'
                  />
                </div>
                {/* channel title */}
                <div className=''>
                  <p className='text-base font-medium'>
                    {videoDetails?.snippet?.channelTitle}
                  </p>
                </div>
              </div>

              <div className='flex gap-5'>
                {/* like */}
                <div className='bg-foreground/10 py-2 px-3 rounded-full flex gap-1 items-center'>
                  <BiLike className='text-xl' />
                  <p>{numberWithCommas(videoDetails?.statistics?.likeCount)}</p>
                </div>

                {/* share */}
                <button
                  onClick={copyToClipboard}
                  className='bg-foreground/10 py-2 px-3 rounded-full flex gap-1 items-center'>
                  <PiShareFatLight className='text-xl' />
                  <p>Share</p>
                </button>
              </div>
            </div>

            {/* description */}
            <div className='w-full bg-foreground/10 rounded-xl lg:rounded-3xl p-5 text-sm lg:text-base whitespace-break-spaces break-all'>
              <div className='flex gap-3 items-center mb-3'>
                <p className='font-medium'>
                  {numberWithCommas(videoDetails?.statistics?.viewCount)} Views
                </p>
                <p>{readableTime}</p>
              </div>

              <p>{videoDetails?.snippet?.description}</p>
            </div>

            {/* related videos */}
            <h1 className='text-xl lg:text-2xl font-semibold capitalize'>
              related videos
            </h1>
            <div className='w-full min-h-max grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
              {relatedVideos?.map((video) => (
                <VideoCard
                  className={`w-full`}
                  key={video.id.videoId}
                  video={video}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  )
}
export default VideoContent
