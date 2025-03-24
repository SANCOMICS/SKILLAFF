import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useNavigate } from '@remix-run/react'
import { Button, Card, Col, Row, Spin, Typography, message } from 'antd'
import { useState } from 'react'
import { ImageOptimizedClient } from '~/plugins/image-optimize/client'
const { Title, Text } = Typography

export default function CoursesPage() {
  const navigate = useNavigate()
  const { user, isLoggedIn, checkRole } = useUserContext()
  const { data: courses, isLoading } = Api.course.findMany.useQuery({})
  const { data: subscription } = Api.subscription.findFirst.useQuery({
    where: { userId: user?.id },
  })
  const { data: premiumLink, isLoading: isLoadingPremiumLink } =
    Api.premiumLink.findFirst.useQuery(undefined, {
      retry: false,
    })

  const isPremiumUser = checkRole(['ADMIN', 'PREMIUM'])

  const handleUpgrade = async () => {
    try {
      if (premiumLink?.url) {
        window.location.href = premiumLink.url
      } else {
        navigate('/upgrade')
      }
    } catch (error) {
      console.error('Error handling upgrade:', error)
      message.error('Failed to process upgrade request. Please try again.')
      navigate('/upgrade')
    }
  }

  const [isEnrolling, setIsEnrolling] = useState(false)

  const { mutateAsync: createEnrollment } = Api.userCourse.create.useMutation()

  const handleJoinCourse = async (course: any) => {
    if (!isLoggedIn) {
      message.warning('Please login to join courses')
      navigate('/login')
      return
    }

    if (course.isPremium) {
      if (!checkRole(['ADMIN', 'PREMIUM'])) {
        message.warning(
          'This is a premium course. Please upgrade your subscription to access.',
        )
        navigate(`/courses/${course.id}/preview`)
        return
      }
    }

    setIsEnrolling(true)
    try {
      await createEnrollment({
        data: {
          courseId: course.id,
          userId: user.id,
        },
      })
      message.success('Successfully enrolled in course')
      navigate(`/courses/${course.id}`)
    } catch (error: any) {
      if (error.code === 'NOT_FOUND') {
        message.error('Course not found')
      } else if (error.code === 'CONFLICT') {
        message.error('You are already enrolled in this course')
      } else if (error.code === 'FORBIDDEN') {
        message.error('Premium subscription required for course enrollment')
      } else {
        message.error('You are already enrolled in this course')
      }
    } finally {
      setIsEnrolling(false)
    }
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
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Title level={2}>
            <i className="las la-play-circle"></i> Course Library
          </Title>
          <Text>
            Explore our collection of premium courses. Upgrade your account to
            access all content.
          </Text>
        </div>

        {!isPremiumUser && !checkRole('ADMIN') && (
          <Card
            style={{
              marginBottom: '24px',
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
                onClick={handleUpgrade}
                loading={isLoadingPremiumLink}
              >
                {isLoadingPremiumLink ? 'Loading...' : 'Upgrade Now'}
              </Button>
            </div>
          </Card>
        )}

        <Row gutter={[24, 24]}>
          {courses?.map(course => (
            <Col xs={24} sm={12} md={8} lg={8} key={course.id}>
              <Card
                hoverable
                cover={
                  <div style={{ position: 'relative' }}>
                    <ImageOptimizedClient.Img
                      src={course.previewUrl}
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
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <i
                        className="las la-play-circle"
                        style={{ fontSize: '48px', color: '#1890ff' }}
                      ></i>
                    </div>
                  </div>
                }
                actions={[
                  <Button
                    key="watch"
                    type={''}
                    block={true}
                    onClick={() => handleJoinCourse(course)}
                    loading={isEnrolling}
                    style={{ backgroundColor: '#000000', color: '#ffffff' }}
                  >
                    Join Course
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      {course.title}
                      {course.isPremium && (
                        <i
                          className="las la-crown"
                          style={{ color: '#ffd700', fontSize: '18px' }}
                        ></i>
                      )}
                    </div>
                  }
                  description={
                    <>
                      <Text>{course.description}</Text>
                      {course.isPremium && !isPremiumUser && (
                        <div style={{ marginTop: '8px' }}>
                          <Text type="secondary">
                            <i className="las la-lock"></i> Premium content
                          </Text>
                        </div>
                      )}
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </PageLayout>
  )
}
