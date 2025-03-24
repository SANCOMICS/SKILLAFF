import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useUploadPublic } from '@/plugins/upload/client'
import type { Prisma, Video } from '@prisma/client'
import { useParams } from '@remix-run/react'
import {
  Button,
  Form,
  Input,
  InputNumber,
  List,
  message,
  Modal,
  Space,
  Spin,
  Switch,
  Table,
  Typography,
  Upload,
} from 'antd'
import type { RcFile, UploadFile } from 'antd/es/upload/interface'
import { useEffect, useState } from 'react'
import { ImageOptimizedClient } from '~/plugins/image-optimize/client'

const { Title } = Typography

export default function CourseEditPage() {
  const { courseId } = useParams()
  const [form] = Form.useForm()
  const [sectionForm] = Form.useForm()
  const [videoForm] = Form.useForm()
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false)
  const [selectedSectionId, setSelectedSectionId] = useState<string>()
  const [editingVideo, setEditingVideo] = useState<Video | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sectionToDelete, setSectionToDelete] = useState<string | null>(null)
  const [showFirstConfirm, setShowFirstConfirm] = useState(false)
  const [showSecondConfirm, setShowSecondConfirm] = useState(false)
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null)
  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    if (course?.previewUrl) {
      setFileList([
        {
          uid: '-1',
          name: 'preview.png',
          status: 'done',
          url: course.previewUrl,
        },
      ])
    }

    const loadTikTokScript = () => {
      const script = document.createElement('script')
      script.src = 'https://www.tiktok.com/embed.js'
      script.async = true
      document.body.appendChild(script)
      return script
    }
    const script = loadTikTokScript()
    return () => {
      if (script) document.body.removeChild(script)
    }
  }, [])

  const { mutateAsync: upload } = useUploadPublic()
  const {
    data: course,
    isLoading,
    refetch,
  } = Api.course.findUnique.useQuery({
    where: { id: courseId },
    include: { sections: { include: { videos: true } } },
  })
  const { mutateAsync: updateCourse } = Api.course.update.useMutation()
  const { mutateAsync: createSection } = Api.section.create.useMutation()
  const { mutateAsync: createVideo } = Api.video.create.useMutation()
  const { mutateAsync: updateVideo } = Api.video.update.useMutation()
  const { mutateAsync: deleteVideo } = Api.video.delete.useMutation()
  const { mutateAsync: deleteSection } = Api.section.delete.useMutation()

  const handleCourseSubmit = async (values: Prisma.CourseUpdateInput) => {
    try {
      let previewUrl = course.previewUrl
      if (fileList.length > 0 && fileList[0] instanceof File) {
        try {
          const { url } = await upload({ file: fileList[0] as RcFile })
          previewUrl = url
        } catch (error) {
          console.error('Image upload error:', error)
          message.error('Failed to upload image: ' + error.message)
          return
        }
      }

      const { paymentLink, ...rest } = values
      const updateData: Prisma.CourseUpdateInput = {
        ...rest,
        previewUrl,
        paymentLink: paymentLink || null,
      }

      console.log('Updating course with data:', updateData)

      await updateCourse({
        where: { id: courseId },
        data: updateData,
      })

      message.success('Course updated successfully')
      refetch()
    } catch (error) {
      console.error('Course update error:', error)
      message.error(`Failed to update course: ${error.message}`)
      message.error('Please check the form values and try again')
    }
  }

  const handleAddSection = async (values: any) => {
    try {
      await createSection({
        data: {
          ...values,
          courseId,
        },
      })
      message.success('Section added successfully')
      sectionForm.resetFields()
      refetch()
    } catch (error) {
      message.error('Failed to add section')
    }
  }

  const handleEditVideo = (video: any) => {
    setEditingVideo(video)
    videoForm.setFieldsValue(video)
    setIsVideoModalVisible(true)
  }

  const handleDeleteVideo = async (videoId: string) => {
    try {
      await deleteVideo({ where: { id: videoId } })
      message.success('Video deleted successfully')
      refetch()
    } catch (error) {
      console.error('Delete video error:', error)
      message.error(`Failed to delete video: ${error.message}`)
    }
  }

  const handleDeleteSection = async (sectionId: string) => {
    try {
      await deleteSection({ where: { id: sectionId } })
      message.success('Section deleted successfully')
      refetch()
    } catch (error) {
      console.error('Delete section error:', error)
      message.error(`Failed to delete section: ${error.message}`)
    } finally {
      setSectionToDelete(null)
      setShowFirstConfirm(false)
      setShowSecondConfirm(false)
    }
  }

  const handleAddVideo = async (values: Prisma.VideoCreateInput) => {
    setIsSubmitting(true)
    try {
      const videoData = {
        title: values.title,
        description: values.description,
        embedLink: values.embedLink,
        order: values.order,
        sectionId: selectedSectionId!,
      }

      if (editingVideo) {
        await updateVideo({
          where: { id: editingVideo.id },
          data: videoData,
        })
        message.success('Video updated successfully')
      } else {
        await createVideo({
          data: videoData,
        })
        message.success('Video added successfully')
      }
      refetch()
    } catch (error) {
      console.error('Video save error:', error)
      message.error(`Failed to save video: ${error.message}`)
    } finally {
      setIsVideoModalVisible(false)
      setEditingVideo(null)
      videoForm.resetFields()
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center h-full">
          <Spin size="large" />
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto p-6 md:p-4 sm:p-2">
        <Title level={2}>Edit Course</Title>

        <Form
          form={form}
          layout="vertical"
          initialValues={course}
          onFinish={handleCourseSubmit}
          className="mb-8"
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Input className="w-full" />
          </Form.Item>

          {course?.previewUrl && (
            <Form.Item name="previewUrl" label="Current Preview Image">
              <ImageOptimizedClient.Img
                src={course.previewUrl}
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
            </Form.Item>
          )}

          <Form.Item
            name="previewUrl"
            label={
              course?.previewUrl ? 'Change Preview Image' : 'Preview Image'
            }
          >
            <Upload
              fileList={fileList}
              beforeUpload={file => {
                const isLt2M = file.size / 1024 / 1024 < 2
                if (!isLt2M) {
                  message.error('Image must be smaller than 2MB')
                  return false
                }
                setFileList([file])
                return false
              }}
              onRemove={() => setFileList([])}
              maxCount={1}
              listType="picture"
            >
              {fileList.length === 0 && '+ Upload'}
            </Upload>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Input.TextArea className="w-full" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price (XAF)"
            rules={[{ required: true }]}
            className="w-full"
          >
            <Input className="w-full" />
          </Form.Item>

          <Form.Item name="paymentLink" label="Payment Link" className="w-full">
            <Input className="w-full" placeholder="Enter payment URL" />
          </Form.Item>

          <Form.Item
            name="isPremium"
            label="Premium Course"
            valuePropName="checked"
            className="w-full"
          >
            <Switch />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Update Course
          </Button>
        </Form>

        <div className="mb-8">
          <Title level={3}>Sections</Title>
          <Form
            form={sectionForm}
            layout="vertical"
            onFinish={handleAddSection}
          >
            <Form.Item
              name="title"
              label="Section Title"
              rules={[{ required: true }]}
              className="w-full"
            >
              <Input className="w-full" />
            </Form.Item>

            <Form.Item
              name="order"
              label="Order"
              rules={[{ required: true }]}
              className="w-full"
            >
              <InputNumber min={1} className="w-full" />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Add Section
            </Button>
          </Form>
        </div>

        <List
          dataSource={course?.sections}
          renderItem={(section: any) => (
            <List.Item>
              <div className="w-full">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                  <Title level={4}>{section.title}</Title>
                  <Space gap={2}>
                    <Button
                      type="primary"
                      onClick={() => {
                        setSelectedSectionId(section.id)
                        setIsVideoModalVisible(true)
                      }}
                    >
                      Add Video
                    </Button>
                    <Button
                      danger
                      onClick={() => {
                        setSectionToDelete(section.id)
                        setShowFirstConfirm(true)
                      }}
                    >
                      Delete Section
                    </Button>
                  </Space>
                </div>

                <Table
                  dataSource={section.videos}
                  columns={[
                    { title: 'Title', dataIndex: 'title', ellipsis: true },
                    { title: 'Source', dataIndex: 'embedLink', ellipsis: true },
                    { title: 'Order', dataIndex: 'order', ellipsis: true },
                    {
                      title: 'Actions',
                      render: (_, video) => (
                        <Space>
                          <Button onClick={() => handleEditVideo(video)}>
                            Edit
                          </Button>
                          <Button
                            danger
                            onClick={() => setVideoToDelete(video.id)}
                          >
                            Delete
                          </Button>
                        </Space>
                      ),
                    },
                  ]}
                  pagination={false}
                  scroll={{ x: true }}
                  responsive={true}
                />
              </div>
            </List.Item>
          )}
        />

        <Modal
          title={editingVideo ? 'Edit Video' : 'Add Video'}
          open={isVideoModalVisible}
          width="100%"
          centered
          onCancel={() => {
            setIsVideoModalVisible(false)
            setEditingVideo(null)
            videoForm.resetFields()
          }}
          footer={null}
        >
          <Form form={videoForm} layout="vertical" onFinish={handleAddVideo}>
            <Form.Item
              name="title"
              label="Title"
              rules={[
                { required: true },
                { max: 100, message: 'Title cannot exceed 100 characters' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true },
                {
                  max: 500,
                  message: 'Description cannot exceed 500 characters',
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              name="embedLink"
              label="Embed Link"
              rules={[{ required: true, message: 'Please input video link!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="order" label="Order" rules={[{ required: true }]}>
              <InputNumber min={1} />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              {editingVideo ? 'Update' : 'Add'} Video
            </Button>
          </Form>
        </Modal>

        <Modal
          title="Delete Section"
          open={showFirstConfirm}
          width="100%"
          centered
          onOk={() => {
            setShowFirstConfirm(false)
            setShowSecondConfirm(true)
          }}
          onCancel={() => {
            setSectionToDelete(null)
            setShowFirstConfirm(false)
          }}
        >
          <p>
            Are you sure you want to delete this section? All videos will be
            deleted.
          </p>
        </Modal>

        <Modal
          title="Final Confirmation"
          open={showSecondConfirm}
          width="100%"
          centered
          onOk={() => handleDeleteSection(sectionToDelete!)}
          onCancel={() => {
            setSectionToDelete(null)
            setShowSecondConfirm(false)
          }}
        >
          <p>This action cannot be undone. Are you absolutely sure?</p>
        </Modal>

        <Modal
          title="Delete Video"
          open={!!videoToDelete}
          width="100%"
          centered
          onOk={() => {
            handleDeleteVideo(videoToDelete!)
            setVideoToDelete(null)
          }}
          onCancel={() => setVideoToDelete(null)}
        >
          <p>
            Are you sure you want to delete this video? This action cannot be
            undone.
          </p>
        </Modal>
      </div>
    </PageLayout>
  )
}
