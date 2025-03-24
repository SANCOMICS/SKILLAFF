import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useNavigate, useParams } from '@remix-run/react'
import { Button, Card, List, Spin, Typography, message } from 'antd'
import { ImageOptimizedClient } from '~/plugins/image-optimize/client'

const { Title, Text } = Typography

export default function CoursePreviewPage() {
  const navigate = useNavigate()
  const { isLoggedIn } = useUserContext()
  const { courseId } = useParams()
  const { data: course, isLoading } = Api.course.findUnique.useQuery({
    where: { id: courseId },
    include: { sections: { include: { videos: true } } },
  })

  const handleGetNow = async (course: any) => {
    if (!isLoggedIn) {
      message.warning('Please login to join courses')
      navigate('/login')
      return
    }

    if (!course.paymentLink) {
      message.warning('Payment link not available')
      return
    }

    window.location.href = course.paymentLink
  }

  if (isLoading) {
    return (
      <PageLayout layout="full-width">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <ImageOptimizedClient.Img
          src={course?.previewUrl}
          srcOnError="/images/course-fallback.jpg"
          isPretty={true}
          styleWrapper={{
            position: 'relative',
            maxWidth: '100%',
            height: 'auto',
            aspectRatio: '16/9',
          }}
          styleImg={{
            objectFit: 'cover',
            objectPosition: 'center',
            width: '100%',
            height: '100%',
          }}
        />
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <Title level={2}>{course?.title}</Title>
        <Text>{course?.description}</Text>

        <div className="flex items-center gap-4 mt-4">
          <Text strong>XAF {course?.price}</Text>
          <Button type="primary" onClick={() => handleGetNow(course)}>
            GET NOW
          </Button>
        </div>

        <List
          className="mt-8"
          dataSource={course?.sections?.sort((a, b) => a.order - b.order)}
          renderItem={section => (
            <List.Item>
              <Card title={section.title} className="w-full">
                <List
                  dataSource={section.videos?.sort((a, b) => a.order - b.order)}
                  renderItem={video => (
                    <List.Item>
                      <Text>{video.title}</Text>
                    </List.Item>
                  )}
                />
              </Card>
            </List.Item>
          )}
        />

        <Card
          style={{
            marginTop: '24px',
            textAlign: 'center',
            background: '#f0f7ff',
          }}
        >
          <Title level={4}>
            <i className="las la-crown"></i> Unlock All Premium Content
          </Title>
          <Text>
            Get unlimited access to all our premium courses and exclusive
            content.
          </Text>
          <div style={{ marginTop: '16px' }}>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate('/upgrade')}
            >
              Upgrade Now
            </Button>
          </div>
        </Card>
      </div>
    </PageLayout>
  )
}
