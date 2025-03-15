import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { Prisma } from '@prisma/client'
import { useNavigate } from '@remix-run/react'
import { Button, Card, Col, Row, Spin, Typography, message } from 'antd'

const { Title, Text } = Typography

type EnrolledCourseType = Prisma.UserCourseGetPayload<{
  include: {
    course: true
  }
}>

export default function MyCoursesPage() {
  const navigate = useNavigate()
  const { user } = useUserContext()
  const {
    data: enrolledCourses,
    isLoading,
    error,
  } = Api.userCourse.findMany.useQuery(
    { where: { userId: user?.id }, include: { course: true } },
    {
      onError: err => {
        console.error('Failed to fetch enrolled courses:', err)
        message.error('Failed to load your courses. Please try again later.')
      },
    },
  )
  const { data: subscription } = Api.subscription.findFirst.useQuery({
    where: { userId: user?.id },
  })

  const handleContinue = (courseId: string) => {
    navigate(`/courses/${courseId}`)
  }

  if (error) {
    return (
      <PageLayout layout="full-width">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Text type="danger">
            Failed to load courses. Please try again later.
          </Text>
        </div>
      </PageLayout>
    )
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
            <i className="las la-graduation-cap"></i> My Courses
          </Title>
          <Text>Continue learning from where you left off</Text>
        </div>

        <Row gutter={[24, 24]}>
          {enrolledCourses?.map(enrollment => (
            <Col xs={24} sm={12} md={8} lg={8} key={enrollment.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={enrollment.course.title || 'Course preview'}
                    src={
                      enrollment.course.previewUrl ||
                      '/images/course-fallback.jpg'
                    }
                    style={{ height: '200px', objectFit: 'cover' }}
                    loading="lazy"
                    width="100%"
                    height="200"
                  />
                }
              >
                <Card.Meta
                  title={enrollment.course.title}
                  description={enrollment.course.description}
                />
                <Button 
                  type="primary"
                  block
                  style={{ marginTop: '16px' }}
                  onClick={() => handleContinue(enrollment.course.id)}
                >
                  Continue
                </Button>
              </Card>
            </Col>
          ))}

          {enrolledCourses?.length === 0 && (
            <Col span={24} style={{ textAlign: 'center' }}>
              <Text>You haven't enrolled in any courses yet.</Text>
            </Col>
          )}
        </Row>
      </div>
    </PageLayout>
  )
}
