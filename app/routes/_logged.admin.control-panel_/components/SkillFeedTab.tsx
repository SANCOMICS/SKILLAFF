import { Api } from '@/core/trpc'
import { EditOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Modal, Table, Typography } from 'antd'
import { useState } from 'react'

interface VideoFormValues {
  title: string
  description: string
  link: string
}

const { Title } = Typography

export default function SkillFeedTab() {
  const [form] = Form.useForm()
  const [editingVideo, setEditingVideo] = useState<any>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const {
    data: videos,
    isLoading: isLoadingVideos,
    refetch,
  } = Api.skillFeedVideo.findMany.useQuery()
  const { mutateAsync: createVideo, isLoading: isCreating } =
    Api.skillFeedVideo.create.useMutation()
  const { mutateAsync: updateVideo, isLoading: isUpdating } =
    Api.skillFeedVideo.update.useMutation()

  const handleSubmit = async (values: VideoFormValues) => {
    try {
      if (editingVideo) {
        await updateVideo({
          where: { id: editingVideo.id },
          data: values,
        })
        message.success('Video updated successfully')
      } else {
        await createVideo({ data: values })
        message.success('Video created successfully')
      }
      setIsModalVisible(false)
      setEditingVideo(null)
      form.resetFields()
      refetch()
    } catch (error) {
      console.error('Create video error:', error)
      message.error(`Failed to create video: ${error.message}`)
    }
  }

  const columns: Array<{
    title: string
    dataIndex: string
    key: string
    width?: string
    ellipsis?: boolean
    render?: (text: string, record: any) => React.ReactNode
  }> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: '150px',
      ellipsis: true,
      render: (text, record) => {
        if (editingVideo?.id === record.id) return text;
        return <div className="whitespace-normal">{text.length > 60 ? `${text.slice(0, 60)}...` : text}</div>;
      }
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '150px',
      ellipsis: true,
      render: (text, record) => {
        if (editingVideo?.id === record.id) return text;
        return <div className="whitespace-normal">{text.length > 198 ? `${text.slice(0, 198)}...` : text}</div>;
      }
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      width: '150px',
      ellipsis: true,
      render: (text, record) => {
        if (editingVideo?.id === record.id) return text;
        return <div className="whitespace-normal">{text.length > 198 ? `${text.slice(0, 198)}...` : text}</div>;
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <Button
          icon={<EditOutlined />}
          onClick={() => {
            setEditingVideo(record)
            form.setFieldsValue(record)
            setIsModalVisible(true)
          }}
        >
          Edit
        </Button>
      ),
    },
  ]

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Title level={3}>SkillFeed Videos</Title>
      </div>

      <Button
        type="primary"
        onClick={() => {
          form.resetFields()
          setEditingVideo(null)
          setIsModalVisible(true)
        }}
        className="mb-4"
      >
        Add Video
      </Button>

      <Modal
        title={editingVideo ? 'Edit Video' : 'Add Video'}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false)
          setEditingVideo(null)
          form.resetFields()
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input video title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: 'Please input video description!' },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="link"
            label="Link"
            rules={[
              { required: true, message: 'Please input video link!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <div className="flex gap-2">
              <Button
                type="primary"
                htmlType="submit"
                loading={isCreating || isUpdating}
              >
                {editingVideo ? 'Update' : 'Add'} Video
              </Button>
              <Button
                onClick={() => {
                  setIsModalVisible(false)
                  setEditingVideo(null)
                  form.resetFields()
                }}
              >
                Cancel
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <Table
        columns={columns}
        dataSource={videos}
        rowKey="id"
        loading={isLoadingVideos}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />
    </div>
  )
}
