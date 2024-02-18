import { Link } from 'react-router-dom'

const VideoCard = ({ className, video }) => {
  console.log(video)
  const imgData = video?.snippet?.thumbnails.medium
  const videoData = video?.snippet

  return (
    <Link
      to={{
        pathname: `/video/${video?.id.videoId}`,
      }}>
      <div
        className={`${className} min-h-max p-5 bg-foreground/10 rounded-xl flex flex-col gap-5`}>
        <img
          src={imgData?.url}
          className='w-full aspect-video rounded-xl shadow-md'
        />

        <div className='flex flex-col gap-2'>
          {/* video channel */}
          <p>{videoData.channelTitle}</p>
          {/* video title */}
          <p className='text-sm font-medium line-clamp-2'>{videoData.title}</p>
        </div>
      </div>
    </Link>
  )
}

export default VideoCard
