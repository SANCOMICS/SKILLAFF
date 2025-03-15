import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { Button, Typography } from 'antd'

import { useEffect, useState } from 'react'

const { Paragraph, Title, Link } = Typography

const detectUrls = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  return text.split(urlRegex).map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <Link key={i} href={part} target="_blank">
          {part}
        </Link>
      )
    }
    return part
  })
}

const isYoutubeUrl = (url: string) => {
  return url.includes('youtube.com/watch?v=') || url.includes('youtu.be/')
}

const isTiktokUrl = (url: string) => {
  return url.includes('tiktok.com')
}

export default function HomePage() {
  const { data: videos } = Api.skillFeedVideo.findMany.useQuery()
  const [expandedDescriptions, setExpandedDescriptions] = useState<{
    [key: string]: boolean
  }>({})

  const toggleDescription = (videoId: string) => {
    setExpandedDescriptions(prev => ({ ...prev, [videoId]: !prev[videoId] }))
  }

  useEffect(() => {
    const loadTikTokScript = () => {
      const script = document.createElement('script')
      script.src = 'https://www.tiktok.com/embed.js'
      script.async = true
      document.body.appendChild(script)
      return () => document.body.removeChild(script)
    }
    loadTikTokScript()
  }, [])

  return (
    <PageLayout layout="full-width">
      <div className="flex flex-col scroll-smooth snap-y snap-mandatory h-[90vh] overflow-y-scroll mx-[5px]">
        {videos?.map(video => (
          <div
            key={video.id}
            className="w-full h-[90vh] flex flex-col justify-center video-container snap-start snap-always"
          >
            {isYoutubeUrl(video.link) ? (
              <iframe
                src={video.link.replace(
                  /(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/,
                  'youtube.com/embed/$2',
                )}
                className="w-full h-[90vh] mx-auto rounded-lg"
                width="100%"
                height="100%"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : isTiktokUrl(video.link) ? (
              <blockquote
                className="tiktok-embed mx-auto"
                cite={video.link}
                data-video-id={video.link.split('/').pop()}
                data-section="true"
                style={{ width: '325px', height: '90vh' }}
              >
                <section></section>
              </blockquote>
            ) : (
              <div className="text-center text-red-500">
                Unsupported video format
              </div>
            )}
            <div className="mt-2 bg-gray-200 p-4 rounded-lg">
              <Title level={4}>{video.title}</Title>
              <Paragraph
                ellipsis={expandedDescriptions[video.id] ? false : { rows: 2 }}
                onClick={() => toggleDescription(video.id)}
              >
                {detectUrls(video.description)}
              </Paragraph>
              {expandedDescriptions[video.id] && (
                <Button
                  type="link"
                  onClick={() => toggleDescription(video.id)}
                  style={{ padding: 0, marginTop: '8px' }}
                >
                  Read Less
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
