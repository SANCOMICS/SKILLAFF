import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useNavigate, useParams } from '@remix-run/react'
import {
  Button,
  Card,
  Flex,
  List,
  message,
  Modal,
  Spin,
  Typography,
} from 'antd'
import { useState } from 'react'
import { ImageOptimizedClient } from '~/plugins/image-optimize/client'

const { Title, Text } = Typography

export default function CourseDetailsPage() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { user } = useUserContext()
  const [isDropModalVisible, setIsDropModalVisible] = useState(false)
  const [isDropLoading, setIsDropLoading] = useState(false)
  const { mutateAsync: dropCourse } = Api.userCourse.delete.useMutation()
  const { data: enrollment, isLoading: isEnrollmentLoading } =
    Api.userCourse.findFirst.useQuery({
      where: { courseId, userId: user.id },
    })
  const {
    data: course,
    isLoading,
    isLoading: isCourseLoading,
  } = Api.course.findUnique.useQuery({
    where: { id: courseId },
    include: { sections: { include: { videos: true } } },
  })

  if (isLoading || isEnrollmentLoading) {
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
      <div className="mt-5">
        <div>
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
        <div className="px-5">
          <Title level={2}>{course?.title}</Title>
          <Text>{course?.description}</Text>
        </div>

        <List
          className="mt-8"
          dataSource={course?.sections?.sort((a, b) => a.order - b.order)}
          renderItem={section => (
            <List.Item>
              <Card title={section.title}>
                <List
                  dataSource={section.videos?.sort((a, b) => a.order - b.order)}
                  renderItem={video => (
                    <List.Item>
                      <div>
                        <Title level={5}>{video.title}</Title>
                        <div className="mt-4">
                          <iframe
                            src={video.embedLink.replace(
                              /(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/,
                              'youtube.com/embed/$2',
                            )}
                            style={{
                              width: '100vw',
                              height: '56.25vw',
                              maxHeight: '90vh',
                              margin: '0 -24px',
                              position: 'relative',
                              zIndex: 1,
                            }}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <Text className="mt-4">{video.description}</Text>
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </List.Item>
          )}
        />
        {enrollment && (
          <Flex justify="center" className="w-full">
            <Button
              type="primary"
              danger
              onClick={() => setIsDropModalVisible(true)}
              style={{ marginTop: '20px' }}
            >
              Drop Course
            </Button>
          </Flex>
        )}
      </div>

      <Modal
        title="Drop Course"
        open={isDropModalVisible}
        confirmLoading={isDropLoading}
        onOk={async () => {
          setIsDropLoading(true)
          try {
            await dropCourse({ where: { id: enrollment?.id } })
            message.success('Course dropped successfully')
            navigate('/my-courses')
          } catch (error) {
            console.error('Drop course error:', error)
            if (error.code === 'NOT_FOUND') {
              message.error(
                'Course enrollment not found. The course may have already been dropped.',
              )
            } else {
              message.error(error?.message || 'Failed to drop course')
            }
          } finally {
            setIsDropLoading(false)
          }
        }}
        onCancel={() => setIsDropModalVisible(false)}
      >
        <p>
          Are you sure you want to drop this course? This action cannot be
          undone.
        </p>
      </Modal>
    </PageLayout>
  )
}
